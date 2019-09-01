<template>
    <div class="login-form">
        <h2 class="login-heading">Register</h2>
        <form @submit.prevent="register">
            <div class="form-control">
                <BaseInput label="First Name:"
                           v-model="user.firstName"
                           @blur="$v.user.firstName.$touch()"
                           :class="{ error: $v.user.firstName.$error }"
                />
                <template v-if="$v.user.firstName.$error">
                    <p v-if="!$v.user.firstName.required" class="errorMessage">First Name is required.</p>
                    <p v-if="!$v.user.firstName.alpha" class="errorMessage">Numbers or Symbols are not Allowed</p>
                </template>
            </div>

            <div class="form-control">
                <BaseInput label="Last Name:"
                           v-model="user.lastName"
                           @blur="$v.user.lastName.$touch()"
                           :class="{ error: $v.user.lastName.$error }"/>

                <template v-if="$v.user.lastName.$error">
                    <p v-if="!$v.user.lastName.required" class="errorMessage">Last Name is required.</p>
                    <p v-if="!$v.user.lastName.alpha" class="errorMessage">Numbers or Symbols are not Allowed</p>
                </template>
            </div>
            <div class="form-control">
                <BaseInput label="Username:"
                           v-model="user.username"
                           @blur="$v.user.username.$touch()"
                           :class="{ error: $v.user.username.$error }"
                />
                <p>{{ userCheck }}</p>
                <template v-if="$v.user.username.$error">
                    <p v-if="!$v.user.username.required" class="errorMessage">Username is required.</p>
                </template>
            </div>
            <div class="form-control">
                <EmailInput
                        label="Email:"
                        v-model="user.email"
                        @blur="$v.user.email.$touch()"
                        :class="{error: $v.user.email.$error}"
                />
                <template v-if="$v.user.email.$error">
                    <p v-if="!$v.user.email.email" class="errorMessage"></p>
                    <p v-if="!$v.user.email.required" class="errorMessage">Email is required</p>
                </template>
                <p>{{emailCheck}}</p>
            </div>
            <div class="form-control mb-more">
                <PasswordInput
                        label="Password"
                        v-model="user.password"
                        @blur="$v.user.password.$touch()"
                        :class="{error: $v.user.password.$error}"
                />
                <template v-if="$v.user.password.$error">
                    <p v-if="!$v.user.password.minLength" class="errorMessage">Must be 8 Character long</p>
                    <p v-if="!$v.user.password.required" class="errorMessage">Password is required</p>
                </template>

            </div>

            <div class="form-control mb-more">
                <PasswordInput
                        label="Confirm Password"
                        v-model="user.confirmPassword"
                        @blur="$v.user.confirmPassword.$touch()"
                        :class="{error: $v.user.confirmPassword.$error}"
                />
                <template v-if="$v.user.confirmPassword.$error">
                    <p v-if="!$v.user.confirmPassword.sameAsPassword" class="errorMessage">Password Didn't match</p>
                </template>
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit">Create Account</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
  import { ORDER_USER_REGISTER } from '@/genill/core/Users/signin/signin.types';
  import { UserRoutes } from '@/genill/core/Users/user-routing.model';
  import { UserRegister } from '@/genill/core/Users/user/User.model';
  import {
    checkEmailExist,
    checkUsernameExist,
  } from '@/genill/core/Users/user/user.service';
  import BaseInput from '@/genill/shared/forum-component/BaseInput.vue';
  import EmailInput from '@/genill/shared/forum-component/EmailInput.vue';
  import HiddenInput from '@/genill/shared/forum-component/Hidden-input.vue';
  import PasswordInput from '@/genill/shared/forum-component/PasswordInput.vue';
  import axios from 'axios';
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { required, email, minLength, sameAs, alpha } from 'vuelidate/lib/validators';

  @Component({
    components: { PasswordInput, EmailInput, HiddenInput, BaseInput },
    validations: {
      user: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        confirmPassword: { sameAsPassword: sameAs('password') },
      },
    },
  })
  export default class Register extends Vue {
    private user = {} as UserRegister;
    private userCheckdebouncedTime: any;
    private emailCheckDebouncedTime: any;
    private userCheck = '';
    private emailCheck = '';

    @Watch('user.username')
    public usercheck(newValue: string, oldValue: string) {
      this.userCheck = 'Searching...';
      this.userCheckdebouncedTime();
    }

    @Watch('user.email')
    public emailExistCheck(newValue: string, oldValue: string) {
      this.emailCheck = 'Searching...';
      this.emailCheckDebouncedTime();
    }

    public created() {
      this.userCheckdebouncedTime = this.usernameSearchTimeout;
      this.emailCheckDebouncedTime = this.emailSearchTimeout;
    }

    public isUsernameExist() {
      this.userCheck = '';
      const vm = this;
      axios
        .get(checkUsernameExist(this.user.username))
        .then(({ data }) => {
          vm.userCheck = data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    public usernameSearchTimeout() {
      setTimeout(this.isUsernameExist, 3000);
    }

    public isEmailExist() {
      this.emailCheck = '';
      const vm = this;
      axios
        .get(checkEmailExist(this.user.email))
        .then(({ data }) => {
          vm.emailCheck = data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    public emailSearchTimeout() {
      setTimeout(this.isEmailExist, 3000);
    }

    public register() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.$store
          .dispatch(ORDER_USER_REGISTER, this.user)
          .then(() => {
            this.$router.push(UserRoutes.PROFILE);
          }).catch((err) => {
            console.log(err)
        });
      }

    }
  }
</script>

<style scoped>
    .errorMessage {
        color: red;
    }

    .login-input {
        width: 100%;
        font-size: 16px;
        padding: 12px 16px;
        outline: 0;
        border-radius: 3px;
        border: 1px solid lightgrey;
    }
</style>
