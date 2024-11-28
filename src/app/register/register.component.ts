import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationSuccess: boolean = false;
  paymentSuccess: boolean = false;

  classOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString()); 
  isStateSyllabus = false;
  isCbseOrIcse = false;
  isHighSchool = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      studentName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      class: ['', Validators.required],
      gender: ['', Validators.required],
      medium: ['', Validators.required],
      schoolName: ['', Validators.required],
      maths: [false],
      science: [false],
      social: [false],
      kannada: [false],
      sanskrit: [false],
      hindi: [false],
      allSubjects: [false],
      fees: [{ value: 0, disabled: true }, Validators.required],
      paymentMode: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.updateFees();
    });
  }

  ngOnInit() {}

  onClassChange() {
    const selectedClass = parseInt(this.registerForm.get('class')?.value, 10);
    this.isHighSchool = selectedClass === 9 || selectedClass === 10;
    this.isStateSyllabus = this.registerForm.get('medium')?.value === 'state-syllabus';
    this.isCbseOrIcse = this.registerForm.get('medium')?.value === 'cbse' || this.registerForm.get('medium')?.value === 'icse';
  }

  onMediumChange() {
    this.onClassChange();
  }

  isClassValidForSubjects() {
    const selectedClass = parseInt(this.registerForm.get('class')?.value, 10);
    return selectedClass && selectedClass <= 10;
  }

  updateFees() {
    const { maths, science, social, kannada, sanskrit, hindi, allSubjects } = this.registerForm.value;
    const selectedClass = parseInt(this.registerForm.get('class')?.value, 10);
    let fees = 0;

    if (selectedClass === 9 || selectedClass === 10) {
      if (allSubjects) {
        fees = this.isStateSyllabus ? 14000 : 16000;
      } else {
        if (maths) fees += this.isStateSyllabus ? 5000 : 6000;
        if (science) fees += this.isStateSyllabus ? 5000 : 6000;
      }
    } else {
      if (allSubjects) {
        fees = this.isStateSyllabus ? 1200 : 1500;
      } else {
        if (maths) fees += 2000;
        if (science) fees += 2000;
        if (social) fees += 2000;
        if (kannada) fees += 1500;
        if (sanskrit) fees += 1500;
        if (hindi) fees += 1500;
      }
    }

    this.registerForm.get('fees')?.setValue(fees, { emitEvent: false });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.registrationSuccess = true;
    this.snackBar.open('Registration successful!', '', { duration: 3000 });
  }

  initiatePayment() {
    const phonePayNumber = '7259965101';
    const paymentUrl = `upi://pay?pa=${phonePayNumber}&pn=Registration Fee&am=500&cu=INR`;

    window.open(paymentUrl, '_blank'); 
    this.snackBar.open('Redirecting to PhonePe for payment...', '', { duration: 5000 });

    
    setTimeout(() => {
      this.paymentSuccess = true;
      this.snackBar.open('Payment received! You can now complete your registration.', '', { duration: 3000 });
    }, 5000); 
  }

  completePayment() {
    if (this.paymentSuccess) {
      this.snackBar.open('Registration completed successfully!', '', { duration: 3000 });
      this.router.navigate(['/login']);
    } else {
      this.snackBar.open('Payment not completed. Please complete payment to proceed.', '', { duration: 3000 });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
