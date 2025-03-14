import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authResponseModel } from 'src/app/models/authentication/authResponse.model';
import { LoginRequestModel } from 'src/app/models/authentication/loginRequest.model';
import { ResponseModel } from 'src/app/models/response.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  form!: FormGroup

  ngOnInit(): void {
    this.redirectIfAuthenticated();
    this.buildLoginForm();
  }

  redirectIfAuthenticated(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const user: LoginRequestModel = this.form.getRawValue();

      this.login(user);
    }
  }

  login(user: LoginRequestModel): void {
    this.authService.login(user).subscribe({
      next: (response: ResponseModel<authResponseModel>) => {
        console.log("Login successful", response);

        this.authService.setBankAccessToken(response.data.token)
        this.errorMessage = null;
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.log("Login failed", error);

        this.errorMessage = 'Login failed.';
        if (error.error.errors) {
          this.errorMessage = error.error.errors;
        }
      }
    });
  }

  buildLoginForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}