export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
  // URL in front of the junior uses the default use
  urlPrefix?: string;
  // Set token
  specialToken?: string;
  // Whether to turn on a custom request to report an error prompt
  errorMessage?: boolean;
  // Whether to carry token
  withToken?: boolean;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
}
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}
