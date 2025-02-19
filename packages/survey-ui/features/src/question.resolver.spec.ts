import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { questionResolver } from './question.resolver';

describe('questionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => questionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
