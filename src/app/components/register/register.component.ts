import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authResponseModel } from 'src/app/models/authentication/authResponse.model';
import { RegisterRequestModel } from 'src/app/models/authentication/registerRequest.model';
import { ResponseModel } from 'src/app/models/response.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.redirectIfAuthenticated();
    this.buildRegistrationForm();
  }

  redirectIfAuthenticated(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const user: RegisterRequestModel = this.form.getRawValue();

      this.register(user);
    }
  }

  register(user: RegisterRequestModel): void {
    this.authService.register(user).subscribe({
      next: (response: ResponseModel<authResponseModel>) => {
        console.log("Registered", response);

        this.errorMessage = null;

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log("Registration Failed", error);

        this.errorMessage = 'Registeration Failed';
        if (error.error.errors) {
          this.errorMessage = error.error.errors;
        }
      }
    });
  }

  buildRegistrationForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[0-9]{9}$')])
    });
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get phone() { return this.form.get('phone'); }
}