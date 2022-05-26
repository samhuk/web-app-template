import { fetchHealthCheckStatusThunk } from './healthCheck/reducer'
import store from '.'

const beginHealthCheckLoop = (dispatch: typeof store.dispatch) => {
  // Begin periodic healthcheck poll
  dispatch(fetchHealthCheckStatusThunk())
  // setInterval(() => {
  //   store.dispatch(fetchHealthCheckStatusThunk())
  // }, 5000)
}

export const initStore = (dispatch: typeof store.dispatch) => {
  beginHealthCheckLoop(dispatch)
}

export default initStore
