export interface GraphQLResponse<T> {
  data: T;
  loading: boolean;
  error?: any;
}

export interface QueryState<T> {
  loading: boolean;
  error: string | null;
}