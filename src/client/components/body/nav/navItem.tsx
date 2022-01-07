import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = { to: string, text: string, exact?: boolean }

export const render = (props: Props) => (
  <li className="nav-item-wrapper">
    <NavLink to={props.to} className={p => `${p.isActive ? 'isActive' : ''} nav-item`} end={props.exact}>{props.text}</NavLink>
  </li>
)

export default render
