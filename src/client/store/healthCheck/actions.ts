import {
  HealthCheckActions,
  FETCH_HEALTH_CHECK_STATUS,
  HEALTH_CHECK_STATUS_FETCHED,
} from './types'

export const fetchHealthCheckStatus = (): HealthCheckActions => ({
  type: FETCH_HEALTH_CHECK_STATUS,
})

export const healthCheckStatusFetched = (status: boolean, error: any): HealthCheckActions => ({
  type: HEALTH_CHECK_STATUS_FETCHED,
  status,
  error,
})
