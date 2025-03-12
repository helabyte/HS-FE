import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { changelogResolver } from './changelog.resolver';

describe('changelogResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      changelogResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
