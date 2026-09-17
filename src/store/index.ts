import {produce} from 'immer';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {initCachedData} from 'store/init';
import {Uniwind} from 'uniwind';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKVLoader().initialize();

const useStore = create<StoreState>()(
  persist(
    _ => ({
      appTheme: 'light',
      cachedData: initCachedData,
      jpEvent: true,
      worldwideOnly: false,
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

export const useCachedData = () => useStore(state => state.cachedData);
export const useSchoolIdols = () => useStore(state => state.schoolIdols);
export const useWorldwideOnly = () => useStore(state => state.worldwideOnly);
export const useAppTheme = () => useStore(state => state.appTheme);

export const onSwitchWorldwideOnly = () => {
  useStore.setState(
    produce<StoreState>(draft => {
      draft.worldwideOnly = !draft.worldwideOnly;
    }),
  );
};

export const onSwitchTheme = () => {
  useStore.setState(
    produce<StoreState>(draft => {
      const newColor = draft.appTheme === 'dark' ? 'light' : 'dark';
      draft.appTheme = newColor;
      Uniwind.setTheme(newColor);
    }),
  );
};

export const saveCachedData = (cachedData: CachedDataObject) => {
  useStore.setState({cachedData});
};

export const setSchoolIdols = (list: SchoolObject[]) => {
  useStore.setState({schoolIdols: list});
};
