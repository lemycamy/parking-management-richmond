import { Routes } from "@angular/router";
import { Bir } from "./bir";
import { BIRDailyBreakdown } from "./pages/daily-breakdown/daily-breakdown";
import { BIRMonthlySummary } from "./pages/monthly-summary/monthly-summary";


export const birRoutes: Routes = [
  {
    path: '',
    component: Bir
  },
  {
    path: 'daily-breakdown',
    component: BIRDailyBreakdown
  },
  {
    path: 'monthly-summary',
    component: BIRMonthlySummary
  }
 
]