import { getFirstname } from '@/genill/core/Users/profile/profile.getters';
import { GET_USER_PROFILE } from '@/genill/core/Users/profile/profile.types';
import { getUsername } from '@/genill/core/Users/signin/signin.getters';
import { getUserProfileByUsername } from '@/genill/core/Users/user/user.service';
import axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<any, any> = {
  [GET_USER_PROFILE]({commit}) {
    const username = getUsername();
    return axios.get(getUserProfileByUsername(username)).then(({data}) => {
      console.log('profile', data);
      commit(GET_USER_PROFILE, data);
    });
  },
};
