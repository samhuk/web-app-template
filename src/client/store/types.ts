import store, { rootReducer } from '.'

export type RootState = ReturnType<typeof rootReducer>

export type RootDispatch = typeof store.dispatch

export type Store = typeof store

// eslint-disable-next-line no-shadow
export enum FetchingStateBase {
  IDLE = 'idle',
  FETCHING = 'fetching',
  FAILED = 'failed',
}
