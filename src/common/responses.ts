import { OutputError } from './errors'

export type ResponseBase<TData = any, TErrorData = any> = {
  error: OutputError<TErrorData>
  data: TData
}
