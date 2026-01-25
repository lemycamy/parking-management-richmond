import { Routes } from "@angular/router";

import { Reports } from "./reports";
import { DailyBreakdown } from "./pages/daily-breakdown/daily-breakdown";
import { MonthlySummary } from "./pages/monthly-summary/monthly-summary";

export const reportsRoutes: Routes = [
  {
    path: '',
    component: Reports
  },
  {
    path: 'daily-breakdown',
    component: DailyBreakdown
  },
  {
    path: 'monthly-summary',
    component: MonthlySummary
  }
]