import { gql } from 'apollo-angular';

export const GET_PARKING_SESSIONS_BY_PARKING_STATE = gql`
  query GetParkingSessions(
    $page: Int!, 
    $limit: Int!, 
    $parkingState: String!
  ) {
    parkingSessionsByParkingState(
      page: $page, 
      limit: $limit, 
      parkingState: $parkingState
    ) {
      data {
        id
        vehicleType
        plateNumber
        enteredAt
        durationMinutes
        exitedAt
        paymentStatus
        parkingFee
      }
      meta {
        total
        page
        limit
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_PARKING_STATISTICS = gql`
  query GetParkingStatistics {
    parkingStatistics {
      parkedVehicles
      parkedMotorcycles
      revenueToday
      currentlyParked
      totalEntriesToday
    }
  }
`;

export interface ParkingStatistics {
  parkedVehicles: number;
  parkedMotorcycles: number;
  revenueToday: number;
  currentlyParked: number;
  totalEntriesToday: number;
}

export interface ParkingStatisticsResponse {
  parkingStatistics: ParkingStatistics;
}