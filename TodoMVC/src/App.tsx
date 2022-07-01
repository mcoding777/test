import { Box, createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppContext, Context } from './context'
import { RouterUrlPath } from './constant/RouterUrlPath'

const theme = createTheme()

const context = new AppContext()

const Main = React.lazy(() => import('./activities/Pages/MainActivity'))

export const App = observer(() => {
  return (
    <ThemeProvider theme={theme}>
      {/* reset.css와 같은 역할 */}
      <CssBaseline />

      {/* https://ko.reactjs.org/docs/context.html */}
      {/* Context를 사용하면 일일이 Props로 데이터를 넘기지 않고 모든 컴포넌트에 데이터를 전달 가능합니다. */}
      <Context.Provider value={context}>
        <Box>
          <BrowserRouter>
            {/* 라우터 전환 시 나타나는 화면입니다. */}
            <React.Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {/* 라우터 부분입니다. */}
                <Route exact={true} path={RouterUrlPath.Example} component={Main} />
                <Route exact={true} path={RouterUrlPath.Example1} component={Main} />
                <Route exact={true} path={RouterUrlPath.Example2} component={Main} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </Box>
      </Context.Provider>
    </ThemeProvider>
  )
})
