import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder-notification',
  templateUrl: './reminder-notification.component.html',
  styleUrls: ['./reminder-notification.component.scss']
})
export class ReminderNotificationComponent implements OnInit {
  notifications: { message: string; date: string; isPaid: boolean }[] = [];
  totalPendingFees: number = 0;

  private studentData = {
    name: 'John Doe',
    class: '9',
    dateOfJoining: new Date('2024-08-01'),
    totalFees: 16000,
    paidFees: 6000,
    paymentMode: 'monthly', 
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateReminders();
  }

  goBack() {
    this.router.navigate(['/tab1']);
  }

  private generateReminders() {
    const currentDate = new Date();
    const { dateOfJoining, totalFees, paidFees, paymentMode } = this.studentData;

    const monthsElapsed = this.calculateMonthsElapsed(dateOfJoining, currentDate);
    const monthlyFee = totalFees / 12;

    let expectedPayment = 0;
    if (paymentMode === 'monthly') {
      expectedPayment = monthlyFee * monthsElapsed;
    } else if (paymentMode === 'quarterly') {
      expectedPayment = (monthlyFee * 3) * Math.ceil(monthsElapsed / 3);
    } else if (paymentMode === 'yearly') {
      expectedPayment = totalFees;
    }

    const pendingFees = Math.max(0, expectedPayment - paidFees);
    this.totalPendingFees = pendingFees;

    if (pendingFees > 0 && paymentMode !== 'yearly') {
      const reminderMessage = `You have pending fees of ₹${pendingFees}. Please pay them as soon as possible.`;
      this.notifications.push({
        message: reminderMessage,
        date: currentDate.toISOString().split('T')[0],
        isPaid: false,
      });
    } else {
      this.notifications.push({
        message: 'All fees are paid.',
        date: currentDate.toISOString().split('T')[0],
        isPaid: true,
      });
    }
  }

  private calculateMonthsElapsed(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }
}
