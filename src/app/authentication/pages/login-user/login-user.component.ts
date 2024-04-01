import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {AuthenticationService  } from '../../services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  public loginForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.logIn(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('access-token', response.accessToken);
        Swal.fire({
          title: 'Successfully authenticated user!',
          timer: 1500,
          timerProgressBar: true,
          icon: 'success',
          showConfirmButton: false,
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: ({ error }) => {
        localStorage.setItem('access-token', '');
        Swal.fire({
          title: 'Incorrect username or password',
          timer: 1500,
          timerProgressBar: true,
          icon: 'error',
          showConfirmButton: false,
        });
        this.loginForm.reset();
        this.submitted = false;
      },
    });
  }

}
