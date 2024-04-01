import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomAlertService } from '../../services/custom-alert-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-user',
  imports: [ReactiveFormsModule, CommonModule],
  standalone:true,
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertService: CustomAlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
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
        this.handleSuccessfulLogin(response);
      },
      error: (err) => {
        this.handleFailedLogin(err);
      },
    });
  }

  handleSuccessfulLogin(response: any): void {
    localStorage.setItem('access-token', response.accessToken);
    this.showSuccessMessage();
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  handleFailedLogin(error: any): void {
    localStorage.setItem('access-token', '');
    this.showErrorMessage();
    this.loginForm.reset();
    this.submitted = false;
  }

  showSuccessMessage(): void {
    this.alertService.showSuccessMessage('Successfully authenticated user!');
  }

  showErrorMessage(): void {
    this.alertService.showErrorMessage('Incorrect username or password. Please contact your administrator IT');
  }
}
