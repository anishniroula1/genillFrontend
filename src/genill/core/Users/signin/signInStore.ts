import { actions } from '@/genill/core/Users/signin/signin.actions';
import { CLEAR_ALL_STATE, USER_LOGIN, USER_LOGOUT } from '@/genill/core/Users/signin/signin.types';
import { UserProfile } from '@/genill/core/Users/user/User.model';
import { resetState } from '@/store/store';
import axios from 'axios';
import { GetterTree, MutationTree } from 'vuex';

export interface State {
  user?: any;
  username?: any;
  uservalue?: UserProfile;
}

export const createState: State = {
  user: localStorage.getItem('user'),
};

export const mutations: MutationTree<any> = {
  [USER_LOGIN](state: State = createState, payload: any) {
    state.user = payload;
    localStorage.setItem('user', JSON.stringify(payload));
    axios.defaults.headers.common.Authorization = `Bearer ${payload.token}`;
  },
  [USER_LOGOUT](state: State = createState) {
    state.user = null;
    localStorage.removeItem('user');
  },

  [CLEAR_ALL_STATE]() {
    resetState();
  },
};

export const getters: GetterTree<any, any> = {
  getState(state: State) {
    return state;
  },
};

export default {
  namespaced: true,
  state: createState,
  getters,
  actions,
  mutations,
};
