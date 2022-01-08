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
    { to: '/links', text: 'Links' },
  ],
}

export default config
