// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Tab1Component } from './tab1/tab1.component';
import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { ReminderNotificationComponent } from './reminder-notification/reminder-notification.component';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { FeePaymentDetailsComponent } from './fee-payment-details/fee-payment-details.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { MarksComponent } from './marks/marks.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MarksManagementComponent } from './marks-management/marks-management.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { StaffAttendanceRecordComponent } from './staff-attendance-record/staff-attendance-record.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { StudentAttendanceRecordComponent } from './student-attendance-record/student-attendance-record.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFeeDetailsComponent } from './student-fee-details/student-fee-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'tab1', component: Tab1Component },
  { path: 'fee-details', component: FeeDetailsComponent },
  { path: 'reminder-notification', component: ReminderNotificationComponent },
  { path: 'collect-fees', component: CollectFeesComponent },
  { path: 'invoice/:invoiceId', component: InvoiceComponent },
  { path: 'time-table', component: TimeTableComponent },
  { path: 'fee-payment-details', component: FeePaymentDetailsComponent },
  { path: 'attendance/:studentId', component: AttendanceComponent },
  { path: 'marks/:studentId', component: MarksComponent },
  { path: 'enquiry', component: EnquiryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'marks-management', component: MarksManagementComponent },
  { path: 'staff-management', component: StaffManagementComponent },
  { path: 'staff-attendance-record', component: StaffAttendanceRecordComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'student-attendance-record', component: StudentAttendanceRecordComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'student-fee-details', component: StudentFeeDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
