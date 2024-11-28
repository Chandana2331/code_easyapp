import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  otpForm: FormGroup;
  otpSent: boolean = false;
  passwordVisible: boolean = false;
  retrievedPassword: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      otp: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  sendOtp() {
    const phone = this.otpForm.get('phone')?.value;
    this.userService.sendOtp(phone).subscribe(
      (response) => {
        this.otpSent = true;
        console.log('OTP sent to phone:', phone);
      },
      (error) => {
        console.log('Error sending OTP:', error);
      }
    );
  }

  verifyOtp() {
    const phone = this.otpForm.get('phone')?.value;
    const otp = this.otpForm.get('otp')?.value;

    this.userService.verifyOtp(phone, otp).subscribe(
      (response) => {
        this.retrievedPassword = response.password;
        this.passwordVisible = true;
        console.log('Password retrieved:', this.retrievedPassword);
      },
      (error) => {
        console.log('OTP verification failed:', error);
      }
    );
  }

  goBackToLogin() {
    this.router.navigate(['/login']); 
  }
}
