import React from 'react'
import { ServerStatus } from './serverStatus'

export const Home = () => (
  <div className="home">
    <i className="fas fa-flask"></i>
    <div>Welcome to tree-starter</div>
    <ServerStatus />
    <div className="links">
      <div className="header-1">Tech Links</div>
      <table>
        <tr>
          <td className="name-cell">Typescript</td>
          <td className="link-cell"><a href="https://www.typescriptlang.org/">https://www.typescriptlang.org/</a></td>
        </tr>
        <tr>
          <td className="name-cell">React</td>
          <td className="link-cell"><a href="https://reactjs.org/">https://reactjs.org/</a></td>
        </tr>
        <tr>
          <td className="name-cell">ExpressJS</td>
          <td className="link-cell"><a href="https://expressjs.com/">https://expressjs.com/</a></td>
        </tr>
        <tr>
          <td className="name-cell">ESBuild</td>
          <td className="link-cell"><a href="https://esbuild.github.io/">https://esbuild.github.io/</a></td>
        </tr>
        <tr>
          <td className="name-cell">SCSS</td>
          <td className="link-cell"><a href="https://sass-lang.com/">https://sass-lang.com/</a></td>
        </tr>
        <tr>
          <td className="name-cell">Go</td>
          <td className="link-cell"><a href="https://go.dev/">https://go.dev/</a></td>
        </tr>
        <tr>
          <td className="name-cell">Docker</td>
          <td className="link-cell"><a href="https://docs.docker.com/">https://docs.docker.com/</a></td>
        </tr>
      </table>
    </div>
  </div>
)

export default Home
