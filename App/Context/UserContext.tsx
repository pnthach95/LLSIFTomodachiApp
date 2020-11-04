import React, { useReducer, useMemo } from 'react';
import reducer, { initState } from './Reducer';
import type { ActionType, AppState } from '~/Utils/types';

type ContextProps = {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
};

const UserContext = React.createContext({} as ContextProps);

export const UserProvider = ({
  children
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);
  const userReducer = useMemo<ContextProps>(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  );

  return (
    <UserContext.Provider value={userReducer}>{children}</UserContext.Provider>
  );
};

export default UserContext;
