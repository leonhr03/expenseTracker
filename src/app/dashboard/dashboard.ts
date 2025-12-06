import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [
    NgChartsModule,
    NgForOf
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],

})

export class Dashboard {

  transactions: any[] = [
    {id: new Date(), subject: 'Food', category: 'Food', prise: -120},
    {id: new Date(), subject: 'Transport', category: 'Transport', prise: -60},
    {id: new Date(), subject: 'Bills', category: 'Bills', prise: -200},
    {id: new Date(), subject: 'Fun', category: 'Fun', prise: -80},
    {id: new Date(), subject: 'Income', category: 'Income', prise: 2000}
  ];

  lastTransactions: any[] = [this.transactions[0], this.transactions[1]]

  barChartData = {
    labels: ['Food', 'Transport', 'Bills', 'Fun', 'Other'],
    datasets: [
      {
        label: 'Expenses',
        data: [120, 60, 200, 80, 40],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ]
      }
    ]
  };

  pieChartData = {
    labels: ["Food", "Transport", "Bills", "Other"],
    datasets: [
      {
        data: [120, 60, 200, 40],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444'
        ]
      }
    ]
  }
}
