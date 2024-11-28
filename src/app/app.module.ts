import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox'; 


import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { Tab1Component } from './tab1/tab1.component';
import { FeeDetailsComponent } from './fee-details/fee-details.component';
import { ReminderNotificationComponent } from './reminder-notification/reminder-notification.component';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { FeePaymentDetailsComponent } from './fee-payment-details/fee-payment-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { MarksComponent } from './marks/marks.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MarksManagementComponent } from './marks-management/marks-management.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { StaffAttendanceRecordComponent } from './staff-attendance-record/staff-attendance-record.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


import { RouterModule } from '@angular/router';
import { StudentAttendanceRecordComponent } from './student-attendance-record/student-attendance-record.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFeeDetailsComponent } from './student-fee-details/student-fee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    Tab1Component,
    FeeDetailsComponent,
    ReminderNotificationComponent,
    CollectFeesComponent,
    InvoiceComponent,
    TimeTableComponent,
    FeePaymentDetailsComponent,
    AdminDashboardComponent,
    AttendanceComponent,
    EnquiryComponent,
    MarksComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    MarksManagementComponent,
    StaffManagementComponent,
    StaffAttendanceRecordComponent,
    PrivacyPolicyComponent,
    StudentAttendanceRecordComponent,
    StudentListComponent,
    StudentFeeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatRadioModule, 
    MatCheckboxModule, 
    AppRoutingModule, 
    RouterModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [] 
})
export class AppModule {}
