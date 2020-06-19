<template>
  <div id="loginPage">
    <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
      <p class="bg-orange-500 text-white font-bold text-xl p-4">Kanban</p>
    </div>

    <div
      class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32"
    >
      <p class="text-center text-3xl">Login</p>
      <form id="loginForm" @submit.prevent="login" class="flex flex-col pt-3 md:pt-8">
        <div class="message sm:w-full my-3"></div>
        <div class="flex flex-col pt-4">
          <label for="email" class="text-lg">Email</label>
          <input
            type="email"
            v-model="email"
            id="emailLogin"
            placeholder="your@email.com"
            class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div class="flex flex-col pt-4">
          <label for="password" class="text-lg">Password</label>
          <input
            type="password"
            v-model="password"
            id="passwordLogin"
            placeholder="Password"
            class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none"
          />
        </div>

        <input
          type="submit"
          value="Login"
          class="bg-orange-500 shadow-xl rounded-lg text-white font-bold text-lg hover:bg-orange-600 p-2 mt-8"
        />
      </form>
      <div class="text-center pt-10 pb-12">
        <p>
          Don't have an account?
          <a
            href="#"
            @click.prevent="$emit('changePage', 'register')"
            id="toRegisterPage"
            class="underline font-semibold text-orange-500"
          >Register here.</a>
        </p>
      </div>
      <div class="flex justify-center mb-5">
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
      </div>
    </div>
  </div>
</template>

<script>
import serverRequest from "../serverRequest";
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginForm",
  components: {
    GoogleLogin
  },
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "281677667346-92ogtprg2in6ifg826i7plj956g7ed92.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  methods: {
    login() {
      const postData = {
        email: this.email,
        password: this.password
      };
      serverRequest
        .post("/login", postData)
        .then(({ data }) => {
          const user = {
            email: this.email,
            token: data.access_token
          };
          this.$emit("success", user);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      const fullname = googleUser.getBasicProfile().Bd;
      const postData = {
        id_token,
        fullname
      };
      serverRequest
        .post("/google-signin", postData)
        .then(({ data }) => {
          const user = {
            email: data.email,
            token: data.accessToken
          };
          this.$emit("success", user);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }
};
</script>

<style>
</style>