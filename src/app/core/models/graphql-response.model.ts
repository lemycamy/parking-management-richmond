export interface GraphQLResponse<T> {
  data: T;
  loading: boolean;
  error?: any;
}

export interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}