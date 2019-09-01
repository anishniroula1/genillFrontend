<template>
    <div class="login-form">
        <h2 class="login-heading">Login</h2>
        <form @submit.prevent="login">
            <div class="form-control">
                <BaseInput
                        label="Username:"
                        v-model="user.username"
                        @blur="$v.user.username.$touch()"
                        :class="{ error: $v.user.username.$error }"
                />
                <template v-if="$v.user.username.$error">
                    <p v-if="!$v.user.username.required" class="errorMessage">Username is required.</p>
                </template>
            </div>

            <div class="form-control mb-more">
                <PasswordInput
                        label="Password"
                        v-model="user.password"
                        @blur="$v.user.password.$touch()"
                        :class="{error: $v.user.password.$error}"
                />
                <template v-if="$v.user.password.$error">
                    <p v-if="!$v.user.password.required" class="errorMessage">Password is required.</p>
                </template>
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit">Login</button>
            </div>
        </form>
        <p v-if="error">Your password or Username is wrong</p>
    </div>
</template>

<script lang="ts">
import { UserRoutes } from '@/genill/core/Users/user-routing.model';
import BaseInput from '@/genill/shared/forum-component/BaseInput.vue';
import PasswordInput from '@/genill/shared/forum-component/PasswordInput.vue';
import { Component, Vue } from 'vue-property-decorator';
import * as types from './signin.types';
import { ORDER_CLEAR_ALL_STATE } from './signin.types';
import { required } from 'vuelidate/lib/validators';

@Component({
  components: { PasswordInput, BaseInput },
  validations: {
    user: {
      username: { required },
      password: { required }
    }
  }
})
export default class Signin extends Vue {
  private user = {
    username: '',
    password: '',
  };
  private error = false;

  public created() {
    this.$store.dispatch(ORDER_CLEAR_ALL_STATE);
  }

  public login() {
    this.$v.$touch();
    if(!this.$v.$invalid) {
      this.$store
        .dispatch(types.ORDER_USER_LOGIN, this.user)
        .then(() => {
          this.$router.push(UserRoutes.PROFILE);
        }).catch((err) => {
        this.error = true;
      });
    }
  }
}
</script>

<style scoped>
    .errorMessage {
        color: red;
    }

</style>
