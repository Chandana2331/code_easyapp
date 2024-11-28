import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]] 
    });
  }

  login() {
    if (this.loginForm.valid) {
    
      console.log('User logged in:', this.loginForm.value);
     
      this.router.navigate(['/tab1']);
    } else {
      console.log('Form is invalid');
    }
  }

  navigateToAdminLogin() {
    console.log('Navigating to Admin Login');
    this.router.navigate(['/admin-login']); 
  }

  goToRegister() {
    console.log('Navigating to Registration');
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    console.log('Navigating to Forgot Password');
    this.router.navigate(['/forgot-password']);
  }
}
