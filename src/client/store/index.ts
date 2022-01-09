import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import initStore from './init'
import { healthCheckReducer } from './healthCheck/reducer'

export const history = createBrowserHistory()

// Set the root reducer. This defines the root state (see ./types.ts).
export const rootReducer = combineReducers({
  router: connectRouter(history),
  healthCheck: healthCheckReducer,
})

export const store = configureStore({
  // Add the root reducer
  reducer: rootReducer,
  // Enable the redux devtools extension
  devTools: (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  // Add thunk middleware for non-boilerplate async dispatching of actions
  enhancers: [applyMiddleware(thunkMiddleware, routerMiddleware(history))],
})

initStore(store)

export default store
