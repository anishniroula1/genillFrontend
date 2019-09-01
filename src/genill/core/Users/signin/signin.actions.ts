import {
  CLEAR_ALL_STATE,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from '@/genill/core/Users/signin/signin.types';
import * as userService from '@/genill/core/Users/user/user.service';
import axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<any, any> = {
  [USER_REGISTER]({ commit }, credentials: any) {
    return axios
      .post(userService.register, credentials)
      .then(({ data }) => {
        commit(USER_LOGIN, data);
      });
  },

  [USER_LOGIN]({ commit }, credentials: any) {
    return axios.post(userService.login, credentials).then(({ data }) => {
      commit(USER_LOGIN, data);
    });
  },

  [USER_LOGOUT]({ commit }) {
    commit(USER_LOGOUT);
  },

  [CLEAR_ALL_STATE]({commit}) {
    commit(CLEAR_ALL_STATE);
  },
};
