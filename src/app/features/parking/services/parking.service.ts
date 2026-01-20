import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PARKING_SESSIONS_BY_PARKING_STATE } from '../graphql/parking-sessions.queries';
import { map, Observable } from 'rxjs';
import { ParkingSession, ParkingSessionsByParkingStateResponse, ParkingSessionsVariables } from '../models/parking-session.model';
import { PaginatedResponse } from '../../../shared/types/paginated-response.type';
import { CREATE_PARKING_SESSION, EXIT_PARKING_SESSION } from '../graphql/parking.mutations';

@Injectable({
  providedIn: 'root',
})

export class ParkingService {
  private apollo = inject(Apollo);

  getParkingSessions(
    parkingState: "ACTIVE" | "EXITED",
    page: number = 1, 
    limit: number = 10,
  ): Observable<PaginatedResponse<ParkingSession>> {
    return this.apollo
      .query<ParkingSessionsByParkingStateResponse, ParkingSessionsVariables>({
      query: GET_PARKING_SESSIONS_BY_PARKING_STATE,
      variables: { page, limit, parkingState: parkingState },
      fetchPolicy: 'network-only',
    })  
    .pipe(
      map((result) => result.data?.parkingSessionsByParkingState ?? { data: [], meta: { total: 0, page: 0, limit: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false } })
    );
  }

  createParkingSession(input: any) {
    return this.apollo.mutate({
      mutation: CREATE_PARKING_SESSION,
      variables: {
        input
      }
    })
  }

  exitParkingSession(id: string) {
    return this.apollo.mutate({
      mutation: EXIT_PARKING_SESSION,
      variables: { id },
    });
  }
}
