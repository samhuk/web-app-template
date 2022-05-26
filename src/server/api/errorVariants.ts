import { ErrorData, ErrorTypes } from '../../common/errors'

export const CUSTOM_ERROR_DATA_PREFIX = 'CUSTOM_ERROR_DATA: '

export const createError = (errorData: ErrorData): Error => (
  new Error(`${CUSTOM_ERROR_DATA_PREFIX}${JSON.stringify(errorData)}`)
)

const createNotFoundErrorData = (message?: string): ErrorData => ({
  type: ErrorTypes.NOT_FOUND,
  statusCode: 404,
  data: message,
})

const createInvalidRequestErrorData = (message?: string): ErrorData => ({
  type: ErrorTypes.INVALID_REQUEST,
  statusCode: 400,
  data: message,
})

const createServiceTimeoutErrorData = (serviceName: string, timeoutSeconds: number): ErrorData => ({
  type: ErrorTypes.SERVICE_TIMEOUT,
  statusCode: 418,
  data: {
    message: `Service '${serviceName}' timed out after ${timeoutSeconds} seconds.`,
    serviceName,
    timeoutSeconds,
  },
})

const createUnauthorizedErrorData = (message?: string): ErrorData => ({
  type: ErrorTypes.UNAUTHORIZED,
  statusCode: 401,
  data: message,
})

const createServerErrorErrorData = (message?: string): ErrorData => ({
  type: ErrorTypes.SERVER_ERROR,
  statusCode: 500,
  data: message,
})

export const notFound = (message?: string): Error => createError(createNotFoundErrorData(message))

export const invalidRequest = (message?: string): Error => createError(createInvalidRequestErrorData(message))

export const serviceTimeout = (serviceName: string, timeoutSeconds: number): Error => (
  createError(createServiceTimeoutErrorData(serviceName, timeoutSeconds))
)

export const unauthorized = (message?: string): Error => createError(createUnauthorizedErrorData(message))

export const serverError = (message?: string): Error => createError(createServerErrorErrorData(message))
