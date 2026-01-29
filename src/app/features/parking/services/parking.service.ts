import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../../../shared/types/paginated-response.type';
import { CreateParkingSessionDocument, ExitParkingSessionDocument, GetParkingSessionsDocument, GetParkingSessionsQuery, GetParkingSessionsQueryVariables, GetParkingStatisticsDocument, GetParkingStatisticsQuery, GetParkingStatisticsQueryVariables, ParkingSession } from '../../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})

export class ParkingService {
  private apollo = inject(Apollo);

  getParkingSessions(
    variables: GetParkingSessionsQueryVariables
  ): Observable<PaginatedResponse<ParkingSession>> {
    return this.apollo
      .watchQuery<GetParkingSessionsQuery, GetParkingSessionsQueryVariables>({
      query: GetParkingSessionsDocument,
      variables,
      fetchPolicy: 'network-only',  
    })
    .valueChanges
    .pipe(
      map(result => {
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

  createParkingSession(input: any, date: string) {
    return this.apollo.mutate({
      mutation: CreateParkingSessionDocument,
      variables: { input },
      refetchQueries: [
        {
          query: GetParkingSessionsDocument,
          variables: { parkingState: "ACTIVE", date: date, page: 1, limit: 10 }
        },
        {
          query: GetParkingStatisticsDocument,
          variables: { parkingState: "ACTIVE", date: date }
        }
      ],
    })
  }

  exitParkingSession(id: string, date: string) {
    return this.apollo.mutate({
      mutation: ExitParkingSessionDocument,
      variables: { id },
      refetchQueries: [
        {
          query: GetParkingSessionsDocument,
          variables: { parkingState: "ACTIVE", date: date, page: 1, limit: 10 }
        },
        {
          query: GetParkingSessionsDocument,
          variables: { parkingState: "EXITED", date: date, page: 1, limit: 10 }
        },
        {
          query: GetParkingStatisticsDocument,
          variables: { parkingState: "ACTIVE", date: date }
        }
      ],
      awaitRefetchQueries: true,
    });
  }

  getParkingStatistics(variables: GetParkingStatisticsQueryVariables) {
    return this.apollo.watchQuery<GetParkingStatisticsQuery, GetParkingStatisticsQueryVariables>({
      query: GetParkingStatisticsDocument,
      variables,
    })
  }
}