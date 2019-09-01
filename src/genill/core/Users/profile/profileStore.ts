import { actions } from '@/genill/core/Users/profile/profile.actions';
import { GET_USER_PROFILE } from '@/genill/core/Users/profile/profile.types';
import { UserProfile } from '@/genill/core/Users/user/User.model';
import { GetterTree, MutationTree } from 'vuex';

export interface State {
  profileUserValue: UserProfile;
}

export const createState: State = {
  profileUserValue: {},
};

export const mutations: MutationTree<any> = {
  [GET_USER_PROFILE](state: State, payload: UserProfile) {
    state.profileUserValue = payload;
  },
};

export const getters: GetterTree<any, any> = {
  getState(state: State) {
    return state.profileUserValue;
  },

  getFirstname(state: State) {
    return state.profileUserValue.firstName;
  },
};

export default {
  namespaced: true,
  state: createState,
  getters,
  actions,
  mutations,
};
