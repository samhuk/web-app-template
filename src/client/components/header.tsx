import React from 'react'

type Props = {
  title: string;
}

export const Header = ({ title }: Props) => (
  <div className="header">{title}</div>
)

export default Header
