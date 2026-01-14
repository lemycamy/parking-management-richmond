import { PaginatedResponse } from "../../../shared/types/paginated-response.type";
import { PaymentStatusEnum, VehicleTypeEnum } from "./parking.enums";

export interface ParkingSession {
  id: string;
  vehicleType: VehicleTypeEnum;
  plateNumber: string;
  enteredAt: string;
  exitedAt: string | null;
  durationMinutes: number | null;
  paymentStatus: PaymentStatusEnum;
}

export interface ParkingSessionsByParkingStateResponse {
  parkingSessionsByParkingState: PaginatedResponse<ParkingSession>;
}

export interface ParkingSessionsVariables {
  page: number;
  limit: number;
  parkingState: 'ACTIVE' | 'EXITED';
}