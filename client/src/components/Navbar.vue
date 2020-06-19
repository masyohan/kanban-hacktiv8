<template>
  <nav class="flex flex-col md:flex-row items-center justify-between flex-wrap bg-white p-3 shadow">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img class="w-12" src="https://mustopa28121992.github.io/projectt/img/fox--md5--a9e377ae39495073d0e66db163fc8d9b.png" alt="">
          <p href="#" id="toHomeDashboard" class="font-semibold ml-4 text-xl text-gray-700 tracking-tight">Kanban Board</p>
        </div>
        <div class="w-full block flex flex-col md:flex-row items-center md:w-auto">
          <div class="text-sm md:flex-grow">
            
          </div>
          <div>
            <a href="#" @click.prevent="$emit('showModal')" class="inline-block text-sm px-4 py-2 leading-none bg-orange-500 font-bold rounded text-white hover:bg-orange-600 focus:bg-orange-400 mt-4 mr-5 lg:mt-0">New Task</a>
            <a href="#" @click.prevent="$emit('logout')"  class="inline-block text-sm px-4 py-2 leading-none bg-gray-300 font-bold rounded text-gray-700 hover:bg-gray-400 mt-4 lg:mt-0">Logout</a>
          </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>

</style>