import React from 'react'
import NavItem from './navItem'
import config from './config'

export const render = () => (
  <ul className="nav">
    {config.navItems.map((ni, i) => (
      <NavItem to={ni.to} text={ni.text} exact={ni.exact} key={i.toString()} />
    ))}
  </ul>
)

export default render
