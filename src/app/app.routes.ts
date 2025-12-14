import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import {Transactions} from './transactions/transactions';
import {Categories} from './categories/categories';
import {Analytics} from './analytics/analytics';

export const routes: Routes = [
  {path: "dashboard", component: Dashboard},
  {path: "transactions", component: Transactions},
  {path: "categories", component: Categories},
  {path: "analytics", component: Analytics}
];
