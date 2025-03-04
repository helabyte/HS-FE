import { inject, Injectable, OnDestroy } from '@angular/core';

import { defer, from, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { initializeApp } from 'firebase/app';
import {
  DatabaseReference,
  DataSnapshot,
  get,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

import { APP_CONFIG_TOKEN } from '@hela/survey-ui/utils';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService implements OnDestroy {
  private config = inject(APP_CONFIG_TOKEN).firebase || {};
  private app = initializeApp(this.config);
  private readonly db = getDatabase(this.app);
  private readonly subscriptions = new Map<string, () => void>();

  ngOnDestroy(): void {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.subscriptions.clear();
  }

  private dbRef(path: string): DatabaseReference {
    return ref(this.db, path);
  }

  /**
   * Creates a new record (Observable version).
   * - If `key` is provided, sets data at `path/key` (overwrites).
   * - If `key` is omitted, Firebase generates a unique ID (push at `path`).
   *
   * @param path The base path (e.g., 'users', 'products').
   * @param data The data to write (WITHOUT an `id` property).
   * @param key Optional. The key to use.  If omitted, Firebase generates one.
   * @returns An Observable that emits the created data, INCLUDING the ID.
   */
  create<T extends object>(
    path: string,
    data: Omit<T, 'id'>,
    key?: string
  ): Observable<T & { id: string }> {
    return defer(() => {
      const ref = key ? this.dbRef(`${path}/${key}`) : push(this.dbRef(path));
      const newKey = key || ref.key;
      if (!newKey) {
        return throwError(
          () => new Error('Failed to generate a key for the new record.')
        );
      }

      const dataWithId = { ...data, id: newKey } as T & { id: string };
      return from(set(ref, dataWithId)).pipe(
        map(() => dataWithId),
        catchError((error) => {
          console.error('Error creating record:', error);
          return throwError(() => error); // Rethrow for consistent error handling
        })
      );
    });
  }

  /**
   * Reads data from the specified path once (Observable version).
   *
   * @param path The path to read.
   * @returns An Observable that emits the data, or null if no data exists at the path.
   */
  read<T>(path: string): Observable<T | null> {
    return from(get(this.dbRef(path))).pipe(
      map((snapshot: DataSnapshot) =>
        snapshot.exists() ? (snapshot.val() as T) : null
      ),
      catchError((error) => {
        console.error('Error reading data:', error);
        return throwError(() => error); // Consistent error handling
      })
    );
  }

  /**
   * Reads a single record by its ID (Observable version).
   *
   * @param basePath The base path for the data (e.g., 'users', 'products').
   * @param id The ID of the record to read.
   * @returns An Observable that emits the data, or null if not found.
   */
  readById<T>(basePath: string, id: string): Observable<T | null> {
    const fullPath = `${basePath}/${id}`;
    return this.read<T>(fullPath);
  }

  /**
   * Updates a record (Observable version).
   *
   * @param basePath The base path for the data (e.g., 'users', 'products').
   * @param id The ID of the record to update.
   * @param data The partial data to update.
   * @returns An Observable that emits the *complete* updated object, including the ID.
   */
  update<T extends object>(
    basePath: string,
    id: string,
    data: Partial<Omit<T, 'id'>>
  ): Observable<T> {
    const fullPath = `${basePath}/${id}`;
    return from(update(this.dbRef(fullPath), data as Partial<object>)).pipe(
      mergeMap(() => this.read<T>(fullPath)), // Use mergeMap to chain the read
      map((updatedData) => {
        if (!updatedData) {
          throw new Error(
            `Data at path ${fullPath} was unexpectedly null after update.`
          );
        }
        return updatedData;
      }),
      catchError((error) => {
        console.error('Error updating record:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Deletes a record by ID (Observable version).
   *
   * @param basePath The base path for the data (e.g., 'users', 'products').
   * @param id The ID of the record to delete.
   * @returns An Observable that emits void when the deletion is complete.
   */
  delete(basePath: string, id: string): Observable<void> {
    const fullPath = `${basePath}/${id}`;
    return from(remove(this.dbRef(fullPath))).pipe(
      catchError((error) => {
        console.error('Error deleting record:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Sets up a real-time listener for changes at the specified path.
   * This method uses RxJS Observables for a more Angular-idiomatic way
   * of handling real-time data.
   *
   * @param path The path to watch for changes.
   * @returns An Observable that emits the data whenever it changes.  The
   *          Observable will emit `null` if the data is deleted.
   */
  listen<T>(path: string): Observable<T | null> {
    return new Observable<T | null>((observer) => {
      const dbRef = this.dbRef(path);
      const listener = onValue(
        dbRef,
        (snapshot: DataSnapshot) => {
          const data = snapshot.exists() ? (snapshot.val() as T) : null;
          observer.next(data);
        },
        (error) => {
          observer.error(error);
        }
      );

      // Store the unsubscribe function in the map
      this.subscriptions.set(path, () => off(dbRef, 'value', listener)); // Use off() to remove the listener

      // Return the unsubscribe function to the Observable
      return () => {
        this.subscriptions.get(path)?.(); // Call stored unsubscribe
        this.subscriptions.delete(path); // Clean from tracking map
      };
    });
  }

  /**
   *  Alternative to `listen` that uses `defer` to ensure the subscription
   *  is created when the Observable is subscribed to, not when the service
   *  is created. This is useful if you only want to start listening when
   *  a component actually needs the data, and can improve performance.
   */
  listenWithDefer<T>(path: string): Observable<T | null> {
    return defer(() => {
      // Use defer()
      return new Observable<T | null>((observer) => {
        const dbRef = this.dbRef(path);
        const listener = onValue(
          dbRef,
          (snapshot: DataSnapshot) => {
            const data = snapshot.exists() ? (snapshot.val() as T) : null;
            observer.next(data);
          },
          (error) => {
            observer.error(error);
          }
        );

        // Store the unsubscribe function in the map
        this.subscriptions.set(path, () => off(dbRef, 'value', listener)); // Use off()

        // Return the unsubscribe function to the Observable
        return () => {
          this.subscriptions.get(path)?.();
          this.subscriptions.delete(path);
        };
      });
    });
  }
}
