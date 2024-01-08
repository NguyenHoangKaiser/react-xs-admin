export interface IRSuccess<T = Recordable> {
  code: number;
  data: T;
  message: string;
  type: string;
}

export interface IRPagination<T = any> {
  items: T[];
  total: number;
}

export interface IRError {
  code: number;
  data: Recordable;
  message: string;
  type: string;
}

// export interface IResult<T = any> {
//   code: number;
//   data: T;
//   message: string;
//   type: string;
// }
