import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  termsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private location: Location) { 
    this.termsForm = this.fb.group({
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.termsForm.valid) {
      this.router.navigate(['/login']);
    }
  }

  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
