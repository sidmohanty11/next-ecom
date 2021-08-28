import { createContext, FC, useContext, useReducer, useMemo } from "react"

export interface StateModifiers {
  openSidebar: () => void
  closeSidebar: () => void
}

export interface StateValues {
  isSidebarOpen: boolean
}

const stateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {}
}

const initialState = {
  isSidebarOpen: false
}

type State = StateValues & StateModifiers

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState
})

type ActionType = { type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR"}

function uiReducer(state: StateValues, action: ActionType) {
  switch(action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: true
      }
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: false
      }
    }
  }
} 

const UIProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)
  const openSidebar = () => dispatch({type: "OPEN_SIDEBAR"})
  const closeSidebar = () => dispatch({type: "CLOSE_SIDEBAR"})

  const value = useMemo(() => { return { ...state, openSidebar, closeSidebar }}, [state])
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const ctx = useContext(UIContext)
  return ctx
}

export default UIProvider
