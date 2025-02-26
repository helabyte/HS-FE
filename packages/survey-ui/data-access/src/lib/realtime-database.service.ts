import { inject, Injectable, OnDestroy } from '@angular/core';

import { defer, Observable } from 'rxjs';

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
   * Creates a new record.
   * - If `key` is provided, sets data at `path/key` (overwrites).
   * - If `key` is omitted, Firebase generates a unique ID (push at `path`).
   *
   * @param path The base path (e.g., 'users', 'products').
   * @param data The data to write (WITHOUT an `id` property).
   * @param key Optional. The key to use.  If omitted, Firebase generates one.
   * @returns A Promise that resolves with the created data, INCLUDING the ID.
   */
  async create<T extends object>(
    path: string,
    data: Omit<T, 'id'>,
    key?: string
  ): Promise<T & { id: string }> {
    const ref = key ? this.dbRef(`${path}/${key}`) : push(this.dbRef(path));
    const newKey = key || ref.key;
    if (!newKey) {
      throw new Error('Failed to generate a key for the new record.');
    }

    // Combine the data with the ID before writing
    const dataWithId = { ...data, id: newKey } as T & { id: string };
    await set(ref, dataWithId); // Write with the ID

    return dataWithId;
  }

  /**
   * Reads data from the specified path once.
   *
   * @param path The path to read.
   * @returns A Promise that resolves with the data, or null if no data exists at the path.
   */
  async read<T>(path: string): Promise<T | null> {
    const snapshot: DataSnapshot = await get(this.dbRef(path));
    if (snapshot.exists()) {
      return snapshot.val() as T;
    } else {
      return null;
    }
  }

  /**
   * Reads a single record by its ID.
   *
   * @param basePath The base path for the data (e.g., 'users', 'products').
   * @param id The ID of the record to read.
   * @returns A Promise that resolves with the data, or null if not found.
   */
  async readById<T>(basePath: string, id: string): Promise<T | null> {
    const fullPath = `${basePath}/${id}`;
    return this.read<T>(fullPath);
  }

  /**
   * Updates a record.
   *
   * @param basePath The base path for the data (e.g., 'users', 'products').
   * @param id The ID of the record to update.
   * @param data The partial data to update.
   * @returns A Promise that resolves with the *complete* updated object, including the ID.
   */
  async update<T extends object>(
    basePath: string,
    id: string,
    data: Partial<Omit<T, 'id'>>
  ): Promise<T> {
    const fullPath = `${basePath}/${id}`;
    await update(this.dbRef(fullPath), data as Partial<object>);

    const updatedData = await this.read<T>(fullPath);
    if (!updatedData) {
      throw new Error(
        `Data at path ${fullPath} was unexpectedly null after update.`
      );
    }
    return updatedData;
  }

  /**
   * Deletes a record by ID.
   *
   * @param basePath The base path for the data (e.g., 'users', 'products').
   * @param id The ID of the record to delete.
   * @returns A Promise that resolves when the deletion is complete.
   */
  async delete(basePath: string, id: string): Promise<void> {
    const fullPath = `${basePath}/${id}`;
    await remove(this.dbRef(fullPath));
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
