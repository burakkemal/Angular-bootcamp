import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }

  // getter-setter
  get formControls() {
    return this.formGroup.controls;
  }

  hasValidationError(formControlName: string, errorName: string) {
    let errors = this.formControls[formControlName].errors;

    if (errors == null) return false;

    return errors[errorName];
  }

  createLoginForm() {
    this.formGroup = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]), // 1. param => Formdaki bu alanın başlangıç değeri
      // 2. param => validasyonlar
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.authService.login(this.formGroup.value).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        // console.log(error);
        // console.log(error['error']['message']);
      }
    );
  }
}
