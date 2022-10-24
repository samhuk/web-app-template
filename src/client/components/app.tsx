import React from 'react'
import { HealthcheckStatus } from '../../common/responses'

// styles
import '../assets/styles/standard.scss'

import { useAppDispatch, useAppSelector } from '../store'
import { healthcheckArtifacts } from '../store/healthcheck'
import { LoadingState } from '../store/types'

const Healthcheck = (props: { value: HealthcheckStatus, loadingState: LoadingState, error: any }) => {
  if (props.loadingState === LoadingState.IDLE) {
    if (props.value != null) {
      return (
        <div>
          <pre>
            {JSON.stringify(props.value, null, 2)}
          </pre>
        </div>
      )
    }

    return (
      <div><pre>[Healthcheck empty]</pre></div>
    )
  }
  if (props.loadingState === LoadingState.FETCHING) {
    return (
      <div>
        <pre>
          Healthcheck loading...
        </pre>
      </div>
    )
  }

  return (
    <div>
      <pre>
        Healthcheck failed...{props.error}
      </pre>
    </div>
  )
}

export const App = () => {
  const healthcheckStatus = useAppSelector(s => s.healthcheck)
  const dispatch = useAppDispatch()

  if (healthcheckStatus.loadingState === LoadingState.IDLE && !healthcheckStatus.fetched && healthcheckStatus.value == null)
    dispatch(healthcheckArtifacts.fetchThunk)

  return (
    <div className="app">
      <Healthcheck value={healthcheckStatus.value} loadingState={healthcheckStatus.loadingState} error={healthcheckStatus.error} />
    </div>
  )
}

export default App
