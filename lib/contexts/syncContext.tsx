import React, {
  useMemo,
  useReducer,
  createContext,
  useContext,
  FC,
  SetStateAction,
} from 'react'

interface SyncContextType {
  selectedDate: string;
  setSelectedDate: React.Dispatch<SetStateAction<string>>;
}

const initialState = {
  selectedDate: new Date().toDateString(),
  setSelectedDate: () => "",
}

export const SyncContext = createContext<SyncContextType>(initialState)

function reducer(
  state: any,
  action: { type: string; payload?: number | string | null },
) {
  switch (action.type) {
    case 'SET_SELECTED_DATE': {
      return {
        ...state,
        selectedDate: action.payload,
      }
    }
    default: {
      return console.error('no action')
    }
  }
}

export const SyncProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setSelectedDate = (payload: string) =>
    dispatch({ type: 'SET_SELECTED_DATE', payload })

  const value = useMemo(
    () => ({
      ...state,
      setSelectedDate,
    }),
    [state],
  )

  return <SyncContext.Provider value={value} {...props} />
}

export const useSyncState = () => {
  const context = useContext<SyncContextType>(SyncContext)
  if (context === undefined) {
    throw new Error(`must be used within a Sync Provider`)
  }
  return context
}

export const SyncContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => <SyncProvider>{children}</SyncProvider>
