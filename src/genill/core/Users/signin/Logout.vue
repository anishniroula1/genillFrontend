<template>

</template>

<script lang="ts">
import { UserRoutes } from '@/genill/core/Users/user-routing.model';
import { Component, Vue } from 'vue-property-decorator';
import * as types from './signin.types';

@Component({})
export default class Logout extends Vue {

  public created() {
    this.$store.dispatch(types.ORDER_USER_LOGOUT).then(() => {
      this.$router.push(UserRoutes.LOGIN);
    });
  }

}
</script>

