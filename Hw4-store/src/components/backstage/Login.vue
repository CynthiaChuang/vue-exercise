<template>
  <div>
    <form class="form-signin" @submit.prevent="onSubmit">
      <h2 class="web-title text-dark text-center mb-3">{{ $t("shopName") }}</h2>

      <h6 v-show="loginFailed" class="text-danger text-center">
        <small>* {{ $t("login.error") }}</small>
      </h6>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" autocomplete="on" id="inputEmail" class="form-control"
             placeholder="Email address" required autofocus v-model="username">


      <label for="inputPassword" class="sr-only">Password</label>
      <div class="eye-icon">
        <input v-show="showPassword" type="text" autocomplete="off" id="inputPassword_showed"
               class="form-control" placeholder="Password" required v-model="password">
        <input v-show="!showPassword" type="password" autocomplete="off" id="inputPassword"
               class="form-control" placeholder="Password" required v-model="password">
        <i class="far" :class="{'fa-eye-slash':showPassword, 'fa-eye':!showPassword}"
           @click.prevent="showPassword = !showPassword"></i>
      </div>

      <!--   TODO:尚未實做-->
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>

      <button class="btn btn-lg btn-secondary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
  import logger from "@/utils/LogUtil.js"
  import apiUtil from "@/utils/ApiUtil.js"
  import routerUtil from "@/utils/RouterUtil.js"

  export default {
    name: "Login",
    data: () => ({
      loginFailed: false,
      showPassword: false,
      username: "",
      password: "",
    }),
    methods: {
      onSubmit() {
        apiUtil.login(this.$http, this.username, this.password).then((response) => {
          logger.debug(this, response.data);
          this.loginFailed = !response.data.success;
          if (this.loginFailed) {
            this.username = "";
            this.password = "";
            return
          }
          routerUtil.gotoManager(this.$router)
        })
      }
    }
  }
</script>

<style scoped>

  .eye-icon {
    position: relative;
    color: #aaa;
    font-size: 16px;
  }

  .eye-icon .fa-eye-slash {
    position: absolute;
    top: 15px;
    left: auto;
    right: 10px;
  }

  .eye-icon .fa-eye {
    position: absolute;
    top: 15px;
    left: auto;
    right: 10px;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .form-signin input[type="text"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }


</style>
