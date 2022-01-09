import React from 'react'
import { ServerStatus } from './serverStatus'

export const Home = () => (
  <div className="home">
    A Typescript React ExpressJS ESBuild Starter.
    <br />
    <br />
    Edit app.tsx and see the client hot-reload!
    <br />
    <br />
    <ServerStatus />
  </div>
)

export default Home
