type NavItem = {
  to: string
  text: string
  exact?: boolean
}

type Config = {
  navItems: NavItem[]
}

export const config: Config = {
  navItems: [
    { to: '/', text: 'Home', exact: true },
    { to: '/orders', text: 'Orders' },
  ],
}

export default config