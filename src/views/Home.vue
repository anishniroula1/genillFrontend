<template>
    <div class="login-form">
        This is home page check


      <p v-if="fullProfile"></p>
        {{firstName + " " +lastName}}
        {{fullProfile.firstName}}

    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { getFirstname, getLastName } from '@/genill/core/Users/profile/profile.getters';

  @Component({})
  export default class Home extends Vue {
      user: any;
      firstName: string = '';
      lastName: string = '';

    get fullProfile() {
      return {
        firstName: this.firstName = getFirstname(),
        lastName: this.lastName = getLastName()
      }
    }



  }
</script>
