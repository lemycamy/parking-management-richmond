import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetParkingSessionsDocument, IncludeParkingSessionInBirDocument } from '../../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apollo = inject(Apollo);

  markSessionAsIncludedInBIR(id: string, date: string) {
    return this.apollo.mutate({
      mutation: IncludeParkingSessionInBirDocument,
      variables: { id },
      refetchQueries: [
        {
          query: GetParkingSessionsDocument,
          variables: { parkingState: "ACTIVE", date: date, page: 1, limit: 10 }
        }
      ]
    })
  }
}
