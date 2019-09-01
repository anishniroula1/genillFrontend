import quiz from '@/genill/core/quiz/QuizStore';
import profile from '@/genill/core/Users/profile/profileStore';
import user from '@/genill/core/Users/signin/signInStore';
import Vue from 'vue';
import Vuex, { Module, ModuleTree } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const userModules: ModuleTree<any> = {
  user,
  quiz,
  profile,
};

const store =  new Vuex.Store({
  /*plugins: [createPersistedState({
    paths: ['user'],
  })],*/
  modules: userModules,
  });

export default store;

const initialStateCopy = JSON.parse(JSON.stringify(store.state));

export function resetState() {
  return store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)));
}
