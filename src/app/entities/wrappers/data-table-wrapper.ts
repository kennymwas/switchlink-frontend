export class DataTableWrapper<T> {
  code: number;
  message: string;
  data: Data<T>;
  timestamp: number;

}

class Data<T> {
  content: Array<T>;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  sort: Array<Sort>;
  numberOfElements: number;

}

class Sort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}
