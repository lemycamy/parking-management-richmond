import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router)
  private authService = inject(AuthService)
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  login() {
    this.authService.login({ username: this.loginForm.value.username, password: this.loginForm.value.password }).subscribe({
      next: (response: any) => {
        this.authService.setToken(response.accessToken);

        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/parking']);
        }

        console.log(role);
      },
      error: () => {
        this.snackBar.open('Invalid credentials', 'OK', {
          duration: 3000,
        })
      }
    })
  }
}