import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PARKING_SESSIONS_BY_PARKING_STATE } from '../../../graphql/queries/parking-sessions.query';
import { map, Observable } from 'rxjs';
import { ParkingSession, ParkingSessionsByParkingStateResponse, ParkingSessionsVariables } from '../models/parking-session.model';
import { PaginatedResponse } from '../../../shared/types/paginated-response.type';

@Injectable({
  providedIn: 'root',
})

export class ParkingService {
  private apollo = inject(Apollo);

  getParkingSessions(
    page: number, 
    limit: number
  ): Observable<PaginatedResponse<ParkingSession>> {
    return this.apollo
      .query<ParkingSessionsByParkingStateResponse, ParkingSessionsVariables>({
      query: GET_PARKING_SESSIONS_BY_PARKING_STATE,
      variables: { page, limit, parkingState: "ACTIVE" },
      fetchPolicy: 'network-only',
    })
    .pipe(
      map((result) => result.data?.parkingSessionsByParkingState ?? { data: [], meta: { total: 0, page: 0, limit: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false } })
    );
  }

}
