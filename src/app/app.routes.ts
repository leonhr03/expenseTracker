import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import {Transactions} from './transactions/transactions';

export const routes: Routes = [
  {path: "", component: Dashboard},
  {path: "transactions", component: Transactions}
];
