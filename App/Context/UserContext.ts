import React from 'react';
import { initState } from './Reducer';
import type { ActionType } from '~/Utils/type';

type ContextProps = {
    state: typeof initState;
    dispatch: React.Dispatch<ActionType>;
}

const UserContext = React.createContext({} as ContextProps);
export default UserContext;
