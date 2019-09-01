import { Quiz } from '@/genill/core/quiz/Quiz.model';
import { ADD_QUIZ, REMOVE_QUIZ } from '@/genill/core/quiz/quiz.types';
import { MutationTree } from 'vuex';

export interface State {
  quiz: Quiz[];
}

export const createState: State = {
  quiz: [{
    question: '',
    answer: '',
  }],
};

export const mutations: MutationTree<any> = {
  [ADD_QUIZ](state: State, payload: { quiz: Quiz }) {
    state.quiz.push(payload.quiz);
  },
  [REMOVE_QUIZ](state: State, payload: number) {
    state.quiz.splice(payload, 1);
  },
};

export default {
  namespaced: true,
  state: createState,
  mutations,
};
