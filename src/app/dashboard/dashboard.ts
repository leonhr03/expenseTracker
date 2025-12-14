import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import {NgForOf, NgIf} from '@angular/common';
import supabase from '../supabase';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgChartsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('barChart') barChart: BaseChartDirective | undefined;
  @ViewChild('pieChart') pieChart: BaseChartDirective | undefined;

  transactions: any[] = [];
  lastTransactions: any[] = [];

  income: number = 0;
  expense: number = 0;
  total: number = 0;

  barChartData = {
    labels: ['Food', 'Transport', 'Fun', 'Income', 'Other'],
    datasets: [
      {
        label: "Categories",
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6']
      }
    ]
  };

  pieChartData = {
    labels: ['Income', 'Expese'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#3B82F6', '#60A5FA']
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: '#fff', font: { size: 14 }, usePointStyle: true }

      },
      title: {
        display: true,
        text: 'Categories',
        color: '#fff',
        font: { size: 18 }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    },
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: '#fff', font: { size: 14 }, usePointStyle: true }
      },
      title: {
        display: true,
        text: 'Income and Expense',
        color: '#fff',
        font: { size: 18 }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    }
  };

  ngOnInit() {
    this.loadTransactions();
    this.cdr.detectChanges();
  }

  async calcChartData() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user?.email;
    const { data } = await supabase
      .from('Transactions')
      .select('transactions')
      .eq('user', user)
      .single();
    if (!data?.transactions) return;

    let food = 0, transport = 0, fun = 0, incomeSum = 0, expenseSum = 0, other = 0;

    data.transactions.forEach((t: any) => {
      const category = t.category?.toLowerCase();
      if (t.income) {
        incomeSum += t.prise;
      } else {
        expenseSum += t.prise;
        switch(category) {
          case 'food': food += t.prise; break;
          case 'transport': transport += t.prise; break;
          case 'fun': fun += t.prise; break;
          default: other += t.prise; break;
        }
      }
    });

    // Income/Expense/Total für Karten
    this.income = incomeSum;
    this.expense = expenseSum;
    this.total = incomeSum - expenseSum;

    // Charts aktualisieren
    this.barChartData.datasets[0].data = [food, transport, fun, incomeSum, other];
    this.pieChartData.datasets[0].data = [incomeSum, expenseSum];

    // Angular und Chart.js update erzwingen
    this.cdr.detectChanges();
    this.barChart?.update();
    this.pieChart?.update();
  }
  async loadTransactions() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user?.email;
    const { data, error } = await supabase.from('Transactions').select('transactions').eq('user', user).single();

    if (error) {
      this.transactions = [];
      return;
    }

    this.transactions = data.transactions || [];
    this.calcChartData();
    this.lastTransactions = this.transactions.slice(0, 2);
  }


}
