<template>
    <GenillContent>
    <div class="login-page">
        <div class="form">
            <h2 class="title">Welcome Back</h2>
        <form @submit.prevent="login">
                <BaseInput
                        placeholder="Username"
                        v-model="user.username"
                        @blur="$v.user.username.$touch()"
                        :class="{ error: $v.user.username.$error }"
                />
                <template v-if="$v.user.username.$error">
                    <p v-if="!$v.user.username.required" class="errorMessage">Username is required.</p>
                </template>

                <PasswordInput
                        placeholder="Password"
                        v-model="user.password"
                        @blur="$v.user.password.$touch()"
                        :class="{error: $v.user.password.$error}"
                />
                <template v-if="$v.user.password.$error">
                    <p v-if="!$v.user.password.required" class="errorMessage">Password is required.</p>
                </template>

                <BaseButton buttonClass="-fill-gradient">Login</BaseButton>
            <p class="message">Not registered? <router-link :to="{name: UserRoutes.REGISTER}">Register</router-link></p>
        </form>
        <p v-if="error">Your password or Username is wrong</p>

        </div>
    </div>
    </GenillContent>
</template>

<script lang="ts">
import { UserRoutes } from '@/genill/core/Users/user-routing.model';
import BaseInput from '@/genill/shared/forum-component/BaseInput.vue';
import PasswordInput from '@/genill/shared/forum-component/PasswordInput.vue';
import { Component, Vue } from 'vue-property-decorator';
import * as types from './signin.types';
import { required } from 'vuelidate/lib/validators';
import BaseButton from "@/genill/shared/forum-component/BaseButton.vue";
import GenillContent from "@/genill/shared/layout/GenillContent.vue";


@Component({
  components: {GenillContent, BaseButton, PasswordInput, BaseInput },
  validations: {
    user: {
      username: { required },
      password: { required }
    }
  }
})
export default class Signin extends Vue {
    public UserRoutes = UserRoutes;
  private user = {
    username: '',
    password: '',
  };
  private error = false;

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
        margin-top: -1em;
    }
    .login-page {
        width: 360px;
        margin: auto;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .title {
        margin-top: -1em;
    }
    .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
    }
    .message a {
        color: #4CAF50;
        text-decoration: none;
    }

</style>
