import { of } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { ResponseBase } from '../../common/responses'

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

const absoluteUrl = (relativeUrl: string) => `${window.location.protocol}//${window.location.host}/api/${relativeUrl}`

const mapValueToQueryParameterValue = (v: any): string => (v != null ? encodeURIComponent(v.toString()) : '')

const parseQueryParameters = (queryParameters: { [param: string]: any }): string => {
  if (queryParameters == null || Object.keys(queryParameters).length === 0)
    return '';

  return Object.entries(queryParameters).reduce((acc, [k, v]) => acc.concat(`&${k}=${mapValueToQueryParameterValue(v)}`), '?')
}

export const get = <TResponseData>(
  url: string,
  queryParameters?: { [param: string]: any },
  headers: { [headerName: string]: string } = DEFAULT_HEADERS,
  responseType: XMLHttpRequestResponseType = 'json',
) => ajax({
    url: absoluteUrl(url).concat(parseQueryParameters(queryParameters)),
    method: 'GET',
    headers,
    responseType,
    timeout: 1000,
  }).pipe(
    map(res => (res as AjaxResponse<ResponseBase<TResponseData>>).response),
    catchError(err => of(err.response as ResponseBase<TResponseData>)),
  ).toPromise()

export const post = <TResponseData>(
  url: string,
  body: any,
  queryParameters?: { [param: string]: any },
  headers: { [headerName: string]: string } = DEFAULT_HEADERS,
  responseType: XMLHttpRequestResponseType = 'json',
) => ajax({
    url: absoluteUrl(url).concat(parseQueryParameters(queryParameters)),
    method: 'POST',
    headers,
    responseType,
    body: JSON.stringify(body),
    timeout: 1000,
  }).pipe(
    map(res => (res as AjaxResponse<ResponseBase<TResponseData>>).response),
    catchError(err => of(err.response as ResponseBase<TResponseData>)),
  ).toPromise()
