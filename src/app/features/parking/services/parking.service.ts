import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PARKING_SESSIONS_BY_PARKING_STATE, GET_PARKING_STATISTICS, ParkingStatisticsResponse } from '../graphql/parking-sessions.queries';
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
      .watchQuery<ParkingSessionsByParkingStateResponse, ParkingSessionsVariables>({
      query: GET_PARKING_SESSIONS_BY_PARKING_STATE,
      variables: { page, limit, parkingState: parkingState },
      fetchPolicy: 'network-only',  
    })
    .valueChanges
    .pipe(
      map(result => {
        result.data?.parkingSessionsByParkingState;
        const raw = result.data?.parkingSessionsByParkingState;

        if (!raw) {
          return {
            data: [] as ParkingSession[],
            meta: { total: 0, page: 0, limit: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false }
          };
        }

        return {
          data: (raw.data || []) as ParkingSession[],
          meta: raw.meta
        } as PaginatedResponse<ParkingSession>;
      })
    );
  }

  createParkingSession(input: any, refetchActive: boolean = true) {
    return this.apollo.mutate({
      mutation: CREATE_PARKING_SESSION,
      variables: { input },
      refetchQueries: [
        ...(refetchActive ? [{
          query: GET_PARKING_SESSIONS_BY_PARKING_STATE,
          variables: { parkingState: "ACTIVE", page: 1, limit: 10 }
        }] : []),

        {
          query: GET_PARKING_STATISTICS,
        }
      ],
    })
  }

  exitParkingSession(id: string) {
    return this.apollo.mutate({
      mutation: EXIT_PARKING_SESSION,
      variables: { id },

      refetchQueries: [
        {
          query: GET_PARKING_SESSIONS_BY_PARKING_STATE,
          variables: { parkingState: "ACTIVE", page: 1, limit: 10 }
        },
        {
          query: GET_PARKING_SESSIONS_BY_PARKING_STATE,
          variables: { parkingState: "EXITED", page: 1, limit: 10 }
        },
        {
          query: GET_PARKING_STATISTICS,
        }
      ],

      awaitRefetchQueries: true,
    });
  }

  getParkingStatistics() {
    return this.apollo.watchQuery<ParkingStatisticsResponse>({
      query: GET_PARKING_STATISTICS,
    })
  }
}