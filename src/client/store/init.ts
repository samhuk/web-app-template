import { fetchHealthCheckStatusThunk } from './healthCheck/reducer'
import { Store } from './types'

export const initStore = (store: Store) => {
  beingHealthCheckLoop(store)
}

const beingHealthCheckLoop = (store: Store) => {
  // Begin periodic healthcheck poll
  store.dispatch(fetchHealthCheckStatusThunk())
  setInterval(() => {
    store.dispatch(fetchHealthCheckStatusThunk())
  }, 5000)
}

export default initStore
