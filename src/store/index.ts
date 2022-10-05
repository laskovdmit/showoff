import {
  createStore,
  createLogger,
  useStore as baseUseStore,
  Store,
  Plugin,
} from 'vuex';
import { InjectionKey } from 'vue';
import auth from './modules/auth';
import { IRootState } from '../types';

const plugins: Plugin<IRootState>[] = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export const key: InjectionKey<Store<IRootState>> = Symbol('Injection Key');
export function useStore() {
  return baseUseStore(key);
}

export default createStore<IRootState>({
  plugins,
  state(): IRootState {
    return {
      count: 1,
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth },
});
