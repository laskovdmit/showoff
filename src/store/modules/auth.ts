import axios from 'axios';
import { Module } from 'vuex';
import { IRootState, IAuthStore, ILogin } from '../../types';

const TOKEN_KEY = 'jwt-token';
const API_KEY = 'AIzaSyDkK8cTxvSAzvqSY7xdpEFMmvK7hvIHgdA';

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
    };
  },
  getters: {
    token(state: IAuthStore) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      return !!getters.token;
    },
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  actions: {
    async login({ commit }, loginData: ILogin) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        const { data } = await axios.post(url, { ...loginData, returnSecureToken: true });
        console.log(data);

        commit('setToken', data.idToken);
      } catch (e) {
        console.log(e);
      }
    },
  },
} as Module<IAuthStore, IRootState>;
