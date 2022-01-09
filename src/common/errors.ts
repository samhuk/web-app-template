export enum ErrorTypes {
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  SERVICE_TIMEOUT = 'SERVICE_TIMEOUT'
}

export type OutputError<TData = any> = {
  type: string
  data: TData
  statusCode: number
  stack: string
}

export type ErrorData<TData = any> = {
  type: string
  data: TData
  statusCode: number
}
