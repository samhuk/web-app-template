import { buildClient } from './buildClient'
import { buildServer } from './buildServer'

// Build client then server
buildClient().then(() => buildServer())
