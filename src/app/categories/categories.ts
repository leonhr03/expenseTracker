import {ChangeDetectorRef, Component, } from '@angular/core';
import supabase from '../supabase';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [
    NgForOf
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
    constructor(private cdr: ChangeDetectorRef) {}
    transactions: any[] = [];
    filteredTransactions: any[] = [];
    selectedCategoryPrice = 0;
    selectedCategoryIsIncome = false;
    income = 0;
    food = 0;
    transport = 0;
    fun = 0;
    other = 0;



    ngOnInit() {
      this.loadData();
    }

  filterData(category: string) {
    let cat = category.toLowerCase();

    if (category === "All") {
      this.filteredTransactions = this.transactions;

      // Alle Einnahmen + Ausgaben zusammen
      this.selectedCategoryPrice =
        this.income + this.food + this.transport + this.fun + this.other;

      this.selectedCategoryIsIncome = this.selectedCategoryPrice >= 0;
    }

    else if (category === "Income") {
      this.filteredTransactions = this.transactions.filter(t => t.income);

      this.selectedCategoryPrice = this.income;
      this.selectedCategoryIsIncome = true;
    }

    else {
      this.filteredTransactions = this.transactions.filter(
        t => t.category?.toLowerCase() === cat
      );

      switch (cat) {
        case "food":
          this.selectedCategoryPrice = this.food;
          break;
        case "transport":
          this.selectedCategoryPrice = this.transport;
          break;
        case "fun":
          this.selectedCategoryPrice = this.fun;
          break;
        case "other":
          this.selectedCategoryPrice = this.other;
          break;
      }

      this.selectedCategoryIsIncome = false;
    }

    this.cdr.detectChanges();
  }

    async loadData() {
      const {data: userData} = await supabase.auth.getUser();
      const user = userData.user?.email;


      const {data} = await supabase.from('Transactions').select('transactions').eq("user", user).single();
      if(!data?.transactions) return;

      this.transactions = data.transactions
      this.filteredTransactions = data.transactions

      data.transactions.forEach((t: any) => {
        const category = t.category?.toLowerCase();
        if(t.income) this.income += t.prise;
        else switch(category) {
          case 'food': this.food += t.prise; break;
          case 'transport': this.transport += t.prise; break;
          case 'fun': this.fun += t.prise; break;
          case "other": this.other += t.prise; break;
        }

        this.selectedCategoryPrice =
          this.income + this.food + this.transport + this.fun + this.other;

        this.cdr.detectChanges();
      })

    }
}
