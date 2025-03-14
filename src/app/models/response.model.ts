export interface ResponseModel<T> {
  status: string;
  success: boolean;
  data: T;
  errors: any;
}