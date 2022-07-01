import React from 'react'

import { AppContext } from './AppContext'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Context = React.createContext<AppContext>(undefined!)

export function useAppContext(): AppContext {
  return React.useContext(Context)
}
