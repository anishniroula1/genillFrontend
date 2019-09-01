<template>
<div>
    <form action="#" @submit.prevent="logValue">
        <button @click="addQuiz">Add Quiz</button>
        <section v-for="(quiz, index) in quizes">
                <h4>Question {{index + 1}}</h4>
            <div>
               <label>Question:{{quiz.question}}</label>
                <input type="text" v-model="quiz.question">
            </div>
            <div>
                <label>Answer</label>
                <input type="text" v-model="quiz.answer">
            </div>
            <div>
                <button @click="removeQuiz">Remove Quiz</button>
            </div>
        </section>
        <input type="submit" value="Submit"/>
    </form>
    {{allQuestion}}
</div>
</template>

<script lang="ts">
import { Quiz } from '@/genill/core/quiz/Quiz.model';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AddQuestions extends Vue {
  public allQuestion = '';
  public quizes: any[] = [{
    question: '',
    answer: '',
  }];

  public addQuiz(quiz: Quiz) {
    this.quizes.push({
      question: '',
      answer: '',
    });
  }

  public removeQuiz(i: number) {
    this.quizes.splice(i, 1);
  }

  public logValue() {
    console.log(this.quizes);
    const jointhis = this.quizes.map((x) => {
      return x.question;
    });
    this.allQuestion = jointhis.join(' |addonthislamo| ');
  }

}
</script>

<style scoped>

</style>
