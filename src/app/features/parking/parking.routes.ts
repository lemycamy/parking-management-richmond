import { Routes } from "@angular/router";
import { Parking } from "./parking";
import { ExitReceipt } from "./pages/exit-receipt/exit-receipt";
import { ExitScan } from "./pages/exit-scan/exit-scan";

export const parkingRoutes: Routes = [
  {
    path: '',
    component: Parking
  },
  {
    path: 'exit-receipt',
    component: ExitReceipt
  },
  {
    path: 'exit-scan',
    component: ExitScan
  }
]