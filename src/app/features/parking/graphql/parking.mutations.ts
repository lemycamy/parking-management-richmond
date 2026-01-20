import { gql } from 'apollo-angular';

export const CREATE_PARKING_SESSION = gql`
  mutation CreateParkingSession($input: CreateParkingSessionInput!) {
    createParkingSession(input: $input) {
      id
      vehicleType
      plateNumber
      enteredAt
      paymentStatus
      parkingState
    }
  }
`;

export const EXIT_PARKING_SESSION = gql`
  mutation ExitParkingSession($id: String!) {
    exitParkingSession(id: $id) {
      id
      parkingState
      exitedAt
      paymentStatus
    }
  }
`;