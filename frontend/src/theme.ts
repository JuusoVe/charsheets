import { theme } from '@chakra-ui/pro-theme'
import { extendTheme } from '@chakra-ui/react'

const proTheme = extendTheme(theme)
const extendedConfig = {
  colors: { ...proTheme.colors, brand: proTheme.colors.blue },
}
export const customTheme = extendTheme(extendedConfig, proTheme)
