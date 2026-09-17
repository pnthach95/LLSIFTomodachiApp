import {MMKVLoader} from 'react-native-mmkv-storage';
import {initCachedData} from 'store/init';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKVLoader().initialize();

const useStore = create<StoreState>()(
  persist(
    _ => ({
      appTheme: 'light',
      cachedData: initCachedData,
      schoolIdols: [],
    }),
    {
      name: 'llsif',
      version: 1,
      storage: createJSONStorage(() => storage as unknown as StateStorage),
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ![''].includes(key)),
        ),
    },
  ),
);

export const useAppTheme = () => useStore(state => state.appTheme);

export const setAppTheme = (appTheme: 'dark' | 'light') => {
  useStore.setState({appTheme});
};

export const saveCachedData = (cachedData: CachedDataObject) => {
  useStore.setState({cachedData});
};

export const setSchoolIdols = (list: SchoolObject[]) => {
  useStore.setState({schoolIdols: list});
};

export default useStore;
