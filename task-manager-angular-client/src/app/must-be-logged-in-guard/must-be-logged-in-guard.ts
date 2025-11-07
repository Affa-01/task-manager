import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthApi } from '../auth-api/auth-api';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const mustBeLoggedInGuard: CanActivateFn = (route, state) => {
  let authApi = inject(AuthApi);
  let router = inject(Router);

  return authApi.isLoggedIn().pipe(
    map (response => {
      const loggedIn = response.loggedIn;
      console.log('Login status:', loggedIn);
      if (loggedIn) return true;

      // redirect if not logged in
      router.navigate(['/login']);
      return false;
    }),
    catchError(err => {
      console.error('Login error:', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
