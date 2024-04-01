import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomAlertService } from '../../services/custom-alert-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signin-user',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {
  public signInForm!: FormGroup;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertService: CustomAlertService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }

    this.authService.signIn(this.signInForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('access-token', response.accessToken);
        this.alertService.showSuccessMessage('Successfully created user!');
      },
      error: (error) => {
        let errorMessage = 'An error occurred';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.alertService.showErrorMessage(errorMessage);
      },
    });
  }
}
