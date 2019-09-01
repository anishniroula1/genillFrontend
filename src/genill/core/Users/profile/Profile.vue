<template>
    <div v-if="profileUser">
        <p>{{user.firstName}}</p>
        <p>{{user.lastName}}</p>
        <p>{{user.username}}</p>
        <p>{{user.accountCreatedDateTime}}</p>
    </div>
</template>

<script lang="ts">
import { UserProfile } from '@/genill/core/Users/user/User.model';
import { Component, Vue } from 'vue-property-decorator';
import { getFullProfile } from './profile.getters';

@Component({})
export default class Profile extends Vue {
  private user = {} as UserProfile;

  get profileUser() {
    return {
      user: this.user = getFullProfile()
    }
  }
}
</script>

<style scoped>

</style>
