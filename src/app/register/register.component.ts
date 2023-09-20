import { Router } from '@angular/router';
import { RegisterModel } from './../models/register-model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  age!: number;
  registerBody!: RegisterModel;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerBody = {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };
    return this.registerBody;
  }

  register() {
    console.log(this.createRegisterForm());
    this.authService.register(this.registerBody).subscribe((response) => {
      console.log(response);
      this.router.navigate(['auth/login']);
    });
  }
}
