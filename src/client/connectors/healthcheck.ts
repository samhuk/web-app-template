import { get } from './core'

export const fetchHealthCheckStatus = () => get<null>(
  'healthcheck',
)
