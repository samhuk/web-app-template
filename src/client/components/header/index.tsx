import React from 'react'
import Nav from '../nav'

export const Header = () => (
  <div className="root-header">
    <div className="left">
      <div className="title">
        <i className="fas fa-flask" />
        tree-starter
      </div>
      <Nav navItems={[]} />
    </div>
  </div>
)

export default Header
