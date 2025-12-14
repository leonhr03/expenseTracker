import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import supabase from '../supabase';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-transactions',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatCheckbox,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  constructor(private cdr: ChangeDetectorRef) {}
  showAddAlert = false;
  activeMenuId: number | null = null;
  subject = '';
  category = '';
  prise = 0;
  income = false;

  transactions: any[] = [];

  ngOnInit() {
    this.loadTransactions()
  }

  async loadTransactions() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user?.email;

    const { data, error } = await supabase
      .from("Transactions")
      .select("transactions")
      .eq("user", user)
      .single()

    if (error) {
      this.transactions = [];
      return;
    }

    this.transactions = data.transactions || [];
    this.cdr.detectChanges();
  }

  async addTransaction() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user?.email;

    const newTransaction = {id: new Date(), subject: this.subject.trim(), category: this.category.trim(), prise: Math.abs(this.prise), income: this.income};

    const updatedList = [newTransaction, ...this.transactions];

    const { error } = await supabase.from("Transactions").upsert({user: user, transactions: updatedList});

    if (error) {
      alert("Fehler beim Speichern: " + error.message);
      return;
    }

    this.transactions = updatedList;
    this.subject = "";
    this.category = "";
    this.prise = 0;
    this.income = false;
    this.showAddAlert = false;

    this.cdr.detectChanges();
  }

  async deleteTransaction(id: number) {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user?.email;

    const updatedList = this.transactions.filter(t => t.id !== id)
    this.transactions = updatedList;
    const { error } = await supabase.from("Transactions").upsert({user: user, transactions: updatedList});
    if (error) {
      alert(error.message);
      return;
    }
    this.cdr.detectChanges();
  }

  toggleMenu(id: number) {
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }
}
