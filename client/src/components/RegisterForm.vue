<template>
    <div id="registerPage">
        <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
            <p class="bg-orange-500 text-white font-bold text-xl p-4">Kanban</p>
        </div>

        <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p class="text-center text-3xl">Register</p>
            <form id="registerForm" @submit.prevent="register" class="flex flex-col pt-3 md:pt-8">
                <div class="message sm:w-full my-3">
                </div>
                <div class="flex flex-col pt-4">
                    <label for="fullname" class="text-lg">Fullname</label>
                    <input type="text" v-model="fullname" id="fullnameRegister" placeholder="John Doe" class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none">
                </div>

                <div class="flex flex-col pt-4">
                    <label for="email" class="text-lg">Email</label>
                    <input type="email" v-model="email" id="emailRegister" placeholder="your@email.com" class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none">
                </div>

                <div class="flex flex-col pt-4">
                    <label for="password" class="text-lg">Password</label>
                    <input type="password" v-model="password" id="passwordRegister" placeholder="Password" class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none">
                </div>

                <input type="submit" value="Register" class="bg-orange-500 shadow-xl rounded-lg text-white font-bold text-lg hover:bg-orange-600 p-2 mt-8">
            </form>
            <div class="text-center pt-12 pb-12">
                <p>Already have an account? <a href="#" @click.prevent="$emit('changePage', 'login')" id="toLoginPage" class="underline font-semibold text-orange-500">Log in here.</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import serverRequest from "../serverRequest";

export default {
    name: 'RegisterForm',
    data () {
        return {
            email: '',
            fullname: '',
            password: ''
        }
    },
    methods: {
        register () {
            const postData = {
                email: this.email,
                fullname: this.fullname,
                password: this.password
            }
            serverRequest.post('/register', postData)
              .then( ({ data }) => {
                  this.$emit('success')
              })
              .catch(err => {
                  console.log(err.response.data)
              })
        }
    }

}
</script>

<style>

</style>