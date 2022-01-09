import { Request, Response, ParamsDictionary } from 'express-serve-static-core'

export type AnyRequest = Request<ParamsDictionary, any, any>
export type AnyResponse = Response<any>

export const successResponse = (req: AnyRequest, res: AnyResponse, data: any) => {
  res.status(200).send({ data, error: null })
}
