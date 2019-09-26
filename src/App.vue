<template>
    <div id="app">
        <div id="allTheNav">
            <nav id="navigator" class="navbar" :class="{navbaropen: opened}">
      <span class="open-slide">
        <a href="#" @click="opened = !opened">
          <div class="con">
            <div class="bar top" :class="{topopen: opened}"></div>
            <div class="bar mid" :class="{midopen: opened}"></div>
            <div class="bar bot" :class="{botopen: opened}"></div>
          </div>
        </a>
      </span>
                <ul class="navbar-nav">
                    <li>
                        <router-link :to="{ name: UserRoutes.WELCOME }">Home</router-link>
                    </li>
                    <li>
                        <router-link v-if="isLogin" :to="{name: UserRoutes.PROFILE}">Profile</router-link>
                    </li>
                    <li>
                        <router-link v-if="isLogin" :to="{ name: 'todo' }">App</router-link>
                    </li>
                    <li>
                        <router-link v-if="isLogin" :to="{ name: UserRoutes.ABOUT }">About</router-link>
                    </li>
                    <li>
                        <router-link v-if="!isLogin" :to="{name: UserRoutes.REGISTER}">Register</router-link>
                    </li>
                    <li>
                        <router-link v-if="!isLogin" :to="{name: UserRoutes.LOGIN}">Login</router-link>
                    </li>
                    <li>
                        <router-link v-if="isLogin" :to="{name: UserRoutes.ADD_QUIZ}">Add Quiz</router-link>
                    </li>
                    <li v-if="isLogin">
                        <a href="/logout">Logout</a>
                    </li>
                </ul>
            </nav>
            <div id="side-menu" class="side-nav" :class="{sidenavopen: opened}">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
            <div id="main" :class="{mainopen: opened}">
                <GenillContent><router-view></router-view></GenillContent>
            </div>
    </div>
    </div>
</template>

<script lang="ts">
  import { isUserLoggedin } from '@/genill/core/Users/signin/signin.getters';
  import { UserRoutes } from '@/genill/core/Users/user-routing.model';
  import { Component, Vue } from 'vue-property-decorator';
  import GenillContent from "@/genill/shared/layout/GenillContent.vue";

  @Component({
      components: {GenillContent}
  })
  export default class App extends Vue {
    public UserRoutes = UserRoutes;
      opened = false;

    get isLogin() {
      return isUserLoggedin();
    }
  }
</script>

<style lang="scss">

    .navbar{
        background-color: #3b5998;
        overflow: hidden;
        height: 55px;
        margin: 1em;
    }

    .navbaropen{
        background-color: #3b5998;
        overflow: hidden;
        height: 63px;
        margin-left: 250px;
    }

    .navbar a{
        float: right;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    .navbar ul{
        margin: 8px 0 0 0;
        list-style: none;
    }

    .navbar a:hover{
        background-color: #ddd;
        color: #000;
    }

    .side-nav{
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        opacity: 0.9;
        overflow-x: hidden;
        padding-top: 60px;
        transition: 0.3s;
    }

    .sidenavopen{
        height: 100%;
        width: 250px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        opacity: 0.9;
        overflow-x: hidden;
        padding-top: 60px;
        transition: 0.3s;
    }

    .side-nav a{
        padding: 10px 10px 10px 30px;
        text-decoration: none;
        font-size: 22px;
        color: #ccc;
        display: block;
        transition: 0.3s;
    }

    .side-nav a:hover{
        color: #fff;
    }

    .side-nav .btn-close{
        position: absolute;
        top: 0;
        right: 22px;
        font-size: 36px;
        margin-left: 50px;
    }

    #main{
        transition: margin-left 0.3s;
        padding: 20px;
        overflow: hidden;
        width: 100%;
    }

    .mainopen{
        transition: margin-left 0.3s;
        padding: 20px;
        overflow: hidden;
        width: 100%;
        margin-left: 250px;
    }

    nav{
        transition: margin-left 0.3s;
    }

    .bar{
        display: block;
        height: 5px;
        width: 35px;
        background: #000;
        margin: 5px auto;
    }

    .midopen{
        width: 0;
    }
    .bar{
        transition: all .3s ease;
    }
    .topopen{
        transform: translateY(10px) rotateZ(45deg);
    }
    .botopen{
        transform: translateY(-10px) rotateZ(-45deg);
    }

</style>

