import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.scss']
})
export class FeeDetailsComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
