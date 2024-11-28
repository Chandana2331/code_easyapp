import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  studentName!: string;
  studentClass!: string;
  studentPhone!: string;
  subjects!: string;
  Totalfees!: number;
  date!: string;

  constructor(public router: Router, private userService: UserService) {}

  ngOnInit() {
    const userData = this.userService.getUserData();
    this.studentName = userData.studentName;
    this.studentClass = userData.studentClass;
    this.studentPhone = userData.studentPhone;
    this.subjects = userData.subjects;
    this.Totalfees = userData.Totalfees;
    this.date = userData.date;
  }
}
