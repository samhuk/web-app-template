import { FetchingStateBase } from '../types'

export const FETCH_HEALTH_CHECK_STATUS = 'FETCH_HEALTH_CHECK_STATUS'
export const HEALTH_CHECK_STATUS_FETCHED = 'HEALTH_CHECK_STATUS_FETCHED'

export type HealthCheckState = {
  status: Boolean
  fetchingState: FetchingStateBase
  error: any
}

type FetchHealthCheckStatusAction = {
  type: typeof FETCH_HEALTH_CHECK_STATUS
}

type HealthCheckStatusFetchedAction = {
  type: typeof HEALTH_CHECK_STATUS_FETCHED
  status: boolean
  error: any
}

export type HealthCheckActions = FetchHealthCheckStatusAction | HealthCheckStatusFetchedAction