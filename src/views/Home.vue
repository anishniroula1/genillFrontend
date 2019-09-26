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
  import axios from 'axios';
  import { getFirstname, getLastName } from '@/genill/core/Users/profile/profile.getters';
  import {profileGraphQL} from "@/genill/core/Users/user/user.service";

  @Component({})
  export default class Home extends Vue {
      user: any;
      firstName: string = '';
      lastName: string = '';
      users = [];

    get fullProfile() {
      return {
        firstName: this.firstName = getFirstname(),
        lastName: this.lastName = getLastName()
      }
    }
  }
</script>
