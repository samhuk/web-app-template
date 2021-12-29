import React from 'react'
import NavItem from './navItem'
import config from './config'

export const render = () => (
  <ul className="nav">
    {config.navItems.map(ni => (
      <NavItem to={ni.to} text={ni.text} exact={ni.exact} />
    ))}
  </ul>
)

export default render