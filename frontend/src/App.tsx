import { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeProvider } from 'styled-components'
import { Home } from './pages/Home'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SkeletonTheme
        baseColor={defaultTheme['gray-600']}
        highlightColor={defaultTheme['gray-500']}
      >
        <Home />
        <GlobalStyle />
      </SkeletonTheme>
    </ThemeProvider>
  )
}
