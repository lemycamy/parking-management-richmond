import { Routes } from "@angular/router";

import { Reports } from "./reports";
import { DailyBreakdown } from "./pages/daily-breakdown/daily-breakdown";
import { MonthlySummary } from "./pages/monthly-summary/monthly-summary";
import { AnnualReport } from "./pages/annual-report/annual-report";
import { ViolationReports } from "./pages/violation-reports/violation-reports";

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
  },
  {
    path: 'annual-report',
    component: AnnualReport
  },
  {
    path: 'violation-reports',
    component: ViolationReports
  }
]