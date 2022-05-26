export type NavConfigItem = {
  to: string
  text: string
  exact?: boolean
}

export type NavConfig = {
  items: NavConfigItem[]
}
