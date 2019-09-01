<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button type="submit" @click="logout">Logout</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '../genill/core/Users/signin/signin.types';

@Component({})
export default class About extends Vue {
  public logout() {
    this.$store.dispatch(types.ORDER_USER_LOGOUT);
  }
}
</script>
