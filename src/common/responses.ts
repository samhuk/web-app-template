import { OutputError } from './errors'

export type ResponseBase<TData = any> = {
  error: OutputError
  data: TData
}
