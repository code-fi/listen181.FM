import {createRootStore, RootStoreType} from './root';
class AppStore {
  static store: RootStoreType;
  static init() {
    if (!AppStore.store) {
      AppStore.store = createRootStore();
    }
  }

  static getStore() {
    return AppStore.store;
  }
}

export const getAppStore = () => {
  return AppStore.store;
};
export const initAppStore = () => {
  AppStore.init();
};
