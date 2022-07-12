import {MMKVLoader} from 'react-native-mmkv-storage';
import create from 'zustand';
import {persist} from 'zustand/middleware';
import {initCachedData} from '~/store/init';
import type {GetState, Mutate, SetState, StoreApi} from 'zustand';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKVLoader().initialize();

const useStore = create(
  persist<
    StoreState,
    SetState<StoreState>,
    GetState<StoreState>,
    Mutate<StoreApi<StoreState>, [['zustand/persist', Partial<StoreState>]]>
  >(
    () => ({
      /** Loading cached data */
      appRoute: 'LOADING',
      cachedData: initCachedData,
      schoolIdols: [],
    }),
    {
      name: 'llsif',
      version: 1,
      getStorage: () => storage as StateStorage,
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['appRoute'].includes(key)),
        ),
    },
  ),
);

export const setAppRoute = (appRoute: 'LOADING' | 'MAIN') => {
  useStore.setState({appRoute});
};

export const saveCachedData = (cachedData: CachedDataObject) => {
  useStore.setState({cachedData});
};

export const setSchoolIdols = (list: SchoolObject[]) => {
  useStore.setState({schoolIdols: list});
};

export default useStore;
