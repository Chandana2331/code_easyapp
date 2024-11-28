import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

 
  private readonly validUsername = 'code_easy';
  private readonly validPassword = 'password123';

  constructor(private fb: FormBuilder, private router: Router) {
   
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

 
  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      
      if (username === this.validUsername && password === this.validPassword) {
        console.log('Login successful:', this.loginForm.value);
        this.router.navigate(['/admin-dashboard']);
      } else {
        console.error('Invalid credentials');
        alert('Invalid username or password!');
      }
    }
  }
}
