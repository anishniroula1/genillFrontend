<template>
    <div class="login-page">
        <div class="form">
        <h2 class="title">Register</h2>
        <form @submit.prevent="register">
                <BaseInput placeholder="First Name"
                           v-model="user.firstName"
                           @blur="$v.user.firstName.$touch()"
                           :class="{ error: $v.user.firstName.$error }"
                />
                <template v-if="$v.user.firstName.$error">
                    <p v-if="!$v.user.firstName.required" class="errorMessage">First Name is required.</p>
                    <p v-if="!$v.user.firstName.alpha" class="errorMessage">Numbers or Symbols are not Allowed</p>
                </template>

                <BaseInput placeholder="Last Name"
                           v-model="user.lastName"
                           @blur="$v.user.lastName.$touch()"
                           :class="{ error: $v.user.lastName.$error }"/>

                <template v-if="$v.user.lastName.$error">
                    <p v-if="!$v.user.lastName.required" class="errorMessage">Last Name is required.</p>
                    <p v-if="!$v.user.lastName.alpha" class="errorMessage">Numbers or Symbols are not Allowed</p>
                </template>

                <BaseInput placeholder="Username"
                           v-model="user.username"
                           @blur="$v.user.username.$touch()"
                           :class="{ error: $v.user.username.$error }"
                />
                <div v-if="userCheck === 'Username already Exist'">
                <p class="errorMessage">{{ userCheck }}</p>
                </div>
                <div v-else>
                    <p class="successMessage">{{ userCheck }}</p>
                </div>
                <template v-if="$v.user.username.$error">
                    <p v-if="!$v.user.username.required" class="errorMessage">Username is required.</p>
                </template>

                <EmailInput
                        placeholder="Email"
                        v-model="user.email"
                        @blur="$v.user.email.$touch()"
                        :class="{error: $v.user.email.$error}"
                />
            <div v-if="emailErrorCheck">
                <p class="errorMessage">{{ emailCheck }}</p>
            </div>
            <div v-else>
                <p class="successMessage">{{ emailCheck }}</p>
            </div>
                <template v-if="$v.user.email.$error">
                    <p v-if="!$v.user.email.email" class="errorMessage"></p>
                    <p v-if="!$v.user.email.required" class="errorMessage">Email is required</p>
                </template>


                <PasswordInput
                        placeholder="Password"
                        v-model="user.password"
                        @blur="$v.user.password.$touch()"
                        :class="{error: $v.user.password.$error}"
                />
                <template v-if="$v.user.password.$error">
                    <p v-if="!$v.user.password.minLength" class="errorMessage">Must be 8 Character long</p>
                    <p v-if="!$v.user.password.required" class="errorMessage">Password is required</p>
                </template>

                <PasswordInput
                        placeholder="Confirm Password"
                        v-model="user.confirmPassword"
                        @blur="$v.user.confirmPassword.$touch()"
                        :class="{error: $v.user.confirmPassword.$error}"
                />
                <template v-if="$v.user.confirmPassword.$error">
                    <p v-if="!$v.user.confirmPassword.sameAsPassword" class="errorMessage">Password Didn't match</p>
                </template>

               <BaseButton buttonClass="-fill-gradient">Register</BaseButton>
            <p class="message">Already have an Account? <router-link :to="{name: UserRoutes.LOGIN}">Login</router-link></p>
        </form>
        </div>
    </div>
</template>
<script lang="ts">
  import { ORDER_USER_REGISTER } from '@/genill/core/Users/signin/signin.types';
  import { UserRegister } from '@/genill/core/Users/user/User.model';
  import {
    checkEmailExist,
    checkUsernameExist,
  } from '@/genill/core/Users/user/user.service';
  import BaseInput from '@/genill/shared/forum-component/BaseInput.vue';
  import EmailInput from '@/genill/shared/forum-component/EmailInput.vue';
  import HiddenInput from '@/genill/shared/forum-component/Hidden-input.vue';
  import PasswordInput from '@/genill/shared/forum-component/PasswordInput.vue';
  import BaseButton from "@/genill/shared/forum-component/BaseButton.vue";
  import axios from 'axios';
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { required, email, minLength, sameAs, alpha } from 'vuelidate/lib/validators';
  import { UserRoutes } from "@/genill/core/Users/user-routing.model";

  @Component({
    components: {BaseButton, PasswordInput, EmailInput, HiddenInput, BaseInput },
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
      public UserRoutes = UserRoutes;
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

    get emailErrorCheck(){
        if(this.emailCheck === 'Please Enter Valid Email' ||
            this.emailCheck === 'Email already Exist, Please login Using your email Address') {
            return true;
        }
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
        margin-top: -1em;
    }

    .successMessage{
        color: green;
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
