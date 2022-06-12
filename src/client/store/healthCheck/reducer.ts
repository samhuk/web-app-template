import { ThunkAction } from 'redux-thunk'
import { fetchHealthCheckStatus as fetchHealthCheckStatusRequest } from '../../connectors/healthcheck'
import { FetchingStateBase, RootState } from '../types'
import { fetchHealthCheckStatus, healthCheckStatusFetched } from './actions'
import {
  FETCH_HEALTH_CHECK_STATUS,
  HEALTH_CHECK_STATUS_FETCHED,
  HealthCheckActions,
  HealthCheckState,
} from './types'

const initialState: HealthCheckState = {
  status: false,
  error: null,
  fetchingState: FetchingStateBase.IDLE,
}

export const healthCheckReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: HealthCheckActions,
): HealthCheckState => {
  switch (action.type) {
    case FETCH_HEALTH_CHECK_STATUS:
      return {
        ...state,
        fetchingState: FetchingStateBase.FETCHING,
      }
    case HEALTH_CHECK_STATUS_FETCHED:
      return {
        status: action.status,
        error: action.error,
        fetchingState: action.error == null ? FetchingStateBase.IDLE : FetchingStateBase.FAILED,
      }
    default:
      return state
  }
}

/**
 * Thunk action creator that fetches the healthcheck status and loads it to state
 */
export const fetchHealthCheckStatusThunk = (): ThunkAction<void, RootState, any, HealthCheckActions> => dispatch => {
  // Start the fetching state
  dispatch(fetchHealthCheckStatus())
  fetchHealthCheckStatusRequest().then(response => {
    dispatch(healthCheckStatusFetched(response.data, response.error))
  })
}
