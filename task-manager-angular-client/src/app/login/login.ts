import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthApi } from '../auth-api/auth-api';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  loading = false;
  error: string | null = null;

  constructor(private router: Router, private ngZone: NgZone, private authApi : AuthApi, private cdr : ChangeDetectorRef) {}

  onSubmit() {
    this.loading = true;
    this.error = null;

    this.authApi.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
      next: () => {
        this.loading = false;
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.error = 'Invalid username or password';
        } else {
          this.error = 'Login failed. Please try again.';
        }
        this.cdr.markForCheck();
      },
    });

    
  }
}