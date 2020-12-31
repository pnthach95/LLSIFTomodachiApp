import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import reducer, { initState } from './Reducer';
import type { ActionType, AppState } from '~/typings';

type ContextProps = {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
};

const UserContext = React.createContext({} as ContextProps);

export const UserProvider: React.FC<unknown> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const userReducer = useMemo<ContextProps>(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <UserContext.Provider value={userReducer}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
