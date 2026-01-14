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
