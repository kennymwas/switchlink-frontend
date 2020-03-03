export class ResponseWrapper<T> {
  code: number;
  message: string;
  data: T;
}
