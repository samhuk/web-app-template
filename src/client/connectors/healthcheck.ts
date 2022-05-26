import { get } from './core'

export const fetchHealthCheckStatus = () => get<boolean>(
  'healthcheck',
)
