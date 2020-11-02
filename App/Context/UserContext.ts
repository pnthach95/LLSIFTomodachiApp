import React from 'react';
import type { ActionType } from '~/Utils/type';

type ContextProps = {
  state: {
    cachedData?: {
      maxStats?: {
        Smile?: number;
        Pure?: number;
        Cool?: number;
      }
    }
  };
  dispatch: React.Dispatch<ActionType>;
}

const UserContext = React.createContext({} as ContextProps);
export default UserContext;
