import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collect-fees',
  templateUrl: './collect-fees.component.html',
  styleUrls: ['./collect-fees.component.scss'],
})
export class CollectFeesComponent {
  
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/tab1']); 
  }

  openPhonePeApp() {
    
    window.open('https://www.phonepe.com/app-download/', '_blank');
  }
}
