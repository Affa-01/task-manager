import { Component, inject, signal } from '@angular/core';
import { AuthApi } from '../auth-api/auth-api';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html'
})
export class Header {
  authApi = inject(AuthApi);
  router = inject(Router);
  isLoggedIm$ = this.authApi.isLoggedIn$;

  logout() {
    this.authApi.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
