<template>
  <div>
      <section id="dashboardPage" v-if="isLogin">
          <Navbar @showModal="showModalAdd" @logout="logout"/>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3 px-10 mt-5">
              <BoxCategory v-for="(cat, index) in categories" @moveTask="updateTask" :key="index" :category="cat">
                  <Task v-for="task in filterCategory(cat.name.toLowerCase())" @delete="showModalDelete" @edit="showModalEdit" :task="task" :key="task.id" :task-id="task.id" :own="currentUser == task.User.email ? 'own' : ''"/>
              </BoxCategory>
          </div>
      </section>

      <section id="authPage" v-else>
      <div class="w-full flex flex-wrap">
    
            <div class="w-full md:w-1/2 flex flex-col">
                <!-- Register Section -->
                <RegisterForm @success="successRegister" @changePage="changePage" v-if="currentPage == 'register'"/>
                <!-- Login Section -->
                <LoginForm @success="successLogin" @changePage="changePage" v-if="currentPage == 'login'"/>
            </div>
    
            <!-- Image Section -->
            <div class="w-1/2 shadow-2xl">
                <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/f2C59x5uvn8">
            </div>
        </div>
      </section>
      <dialog id="modalDelete" class="h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md ">
        
        <div class="flex flex-col w-full h-auto ">
             <!-- Header -->
             <div class="flex w-full h-auto justify-center items-center">
               <div class="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                     Are you sure to delete this task ?
               </div>
               <div onclick="document.getElementById('modalDelete').close();" class="flex w-1/12 h-auto justify-center cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </div>
               <!--Header End-->
             </div>
               <!-- Modal Content-->
               <form id="deleteTask" class="flex flex-col">
                    <input type="button" @click.prevent="deleteTask(selectedTask)" value="Delete" class="bg-red-500 shadow-xl rounded-lg text-white font-bold text-lg hover:bg-red-600 p-2 mt-8">
                </form>
               <!-- End of Modal Content-->
             </div>
     </dialog>

     <dialog id="modalAdd" class="h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md ">
        
        <div class="flex flex-col w-full h-auto ">
             <!-- Header -->
             <div class="flex w-full h-auto justify-center items-center">
               <div class="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                     Add Task
               </div>
               <div onclick="document.getElementById('modalAdd').close();" class="flex w-1/12 h-auto justify-center cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </div>
               <!--Header End-->
             </div>
               <!-- Modal Content-->
               <form @submit.prevent="addTask" id="addForm" class="flex flex-col">
                    <div class="flex flex-col pt-4">
                        <label for="title" class="text-lg">Title</label>
                        <input type="title" v-model="titleNewTask" id="titleTask" placeholder="Your Task" class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none">
                    </div>
                    <input type="submit" value="Add Task" class="bg-orange-500 shadow-xl rounded-lg text-white font-bold text-lg hover:bg-orange-600 p-2 mt-8">
                </form>
               <!-- End of Modal Content-->
             </div>
     </dialog>

     <dialog id="modalEdit" class="h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md ">
        
        <div class="flex flex-col w-full h-auto ">
             <!-- Header -->
             <div class="flex w-full h-auto justify-center items-center">
               <div class="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                     Edit Task
               </div>
               <div onclick="document.getElementById('modalEdit').close();" class="flex w-1/12 h-auto justify-center cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </div>
               <!--Header End-->
             </div>
               <!-- Modal Content-->
               <form id="editForm" @submit.prevent="editTask(selectedTask)" class="flex flex-col">
                    <div class="flex flex-col pt-4">
                        <label for="title" class="text-lg">Title</label>
                        <input type="title" v-model="titleEditTask" id="titleTask" placeholder="Your Task" class="input-form shadow-md appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:border-orange-500 focus:outline-none">
                    </div>
                    <input type="submit" value="Edit Task" class="bg-orange-500 shadow-xl rounded-lg text-white font-bold text-lg hover:bg-orange-600 p-2 mt-8">
                </form>
               <!-- End of Modal Content-->
             </div>
     </dialog>
  </div>
</template>

<script>
let baseURL = 'http://localhost:3000'
let socket = io(baseURL)

import serverRequest from './serverRequest'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BoxCategory from './components/BoxCategory'
import Task from './components/Task'

export default {
    name: 'AppKanban',
    components: {
        Navbar,
        LoginForm,
        RegisterForm,
        BoxCategory,
        Task
    },
    data() {
        return {
            currentUser: null,
            isLogin: false,
            currentPage: 'login',
            categories : [
                {
                    name: 'Backlog',
                    color: 'red'
                },
                {
                    name: 'Todo',
                    color: 'blue'
                },
                {
                    name: 'Doing',
                    color: 'yellow'
                },
                {
                    name: 'Done',
                    color: 'green'
                }
            ],
            titleNewTask: null,
            titleEditTask: null,
            selectedTask: null,
            tasks: []
        }
    },
    methods: {
        changePage (page) {
            this.currentPage = page
        },
        checkAuth () {
            if(localStorage.token) {
                this.isLogin = true
                this.currentUser = localStorage.email
                this.fetchTasks()
            }else{
                this.isLogin = false
            }
        },
        successLogin (data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.email)
            this.currentUser = data.email
            this.checkAuth()
        },
        successRegister () {
            this.changePage('login')
        },
        showModalAdd () {
            document.getElementById('modalAdd').showModal()
        },
        addTask () {
            const config = {
                headers: {
                'access_token': localStorage.token
                }
            }
            const postData = {
                title: this.titleNewTask,
                category: 'backlog'
            }
            serverRequest.post('/tasks', postData, config)
              .then( ({ data }) => {
                  this.titleNewTask = null
                  document.getElementById('modalAdd').close()
                  let newTask = data
                  newTask['User'] = {
                      email: localStorage.email
                  }
                  this.tasks.push(newTask)
                  socket.emit('update-data', this.tasks)
              })
              .catch(err => {
                  console.log(err)
              })
        },
        showModalEdit (id) {
            this.selectedTask = id
            let filterTask = this.tasks.filter(task => {
                return task.id == id
            })
            this.titleEditTask = filterTask[0].title
            document.getElementById('modalEdit').showModal()
        },
        editTask (id) {
            const task = {
                id,
                title: this.titleEditTask
            }
            this.updateTask(task)
            this.titleEditTask = null
            document.getElementById('modalEdit').close()
        },
        showModalDelete (id) {
            this.selectedTask = id
            document.getElementById('modalDelete').showModal()
        },
        deleteTask (id) {
            const config = {
                headers: {
                'access_token': localStorage.token
                }
            }
            serverRequest.delete('/tasks/' + id, config)
              .then( () => {
                  this.tasks = this.tasks.filter(task => {
                      return task.id != id
                  })
                  document.getElementById('modalDelete').close()
                  socket.emit('update-data', this.tasks)
              })
              .catch(err => {
                  console.log(err)
              })
        },
        fetchTasks () {
            const config = {
                headers: {
                'access_token': localStorage.token
                }
            }
            serverRequest.get('/tasks', config)
                .then( ({data}) => {
                    this.tasks = data.tasks
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        },
        logout () {
            localStorage.clear()
            let auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(() => {
                this.isLogin = false
            })
        },
        filterCategory (cat) {
            return this[`${cat}List`]
        },
        updateTask (task) {
            const config = {
                headers: {
                'access_token': localStorage.token
                }
            }
            const index = this.tasks.findIndex( (t,index) => {
                        if(t.id == task.id) return true
                    })
            let oldTask = this.tasks[index]
            let updatedTask = {}
            for(let t in task){
                if(t != 'id'){
                    updatedTask[t] = task[t]
                }
            }
            serverRequest.put(`/tasks/${task.id}`, updatedTask, config)
                .then(response => {
                    for(let t in response.data){
                        this.tasks[index][t] = response.data[t]
                    }
                    socket.emit('update-data', this.tasks)
                })
                .catch(err => {
                    console.log(err.response.data)
                    this.tasks[index] = oldTask
                })
        }
    },
    created () {
        this.checkAuth()
        socket.on('new-data', data => {
            this.tasks = data
        })
    },
    computed: {
        backlogList: function () {
            let list = this.tasks.filter(task => {
                return task.category == 'backlog'
            })
            list = list.sort( (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            return list
        },
        todoList: function () {
            let list =  this.tasks.filter(task => {
                return task.category == 'todo'
            })
            list = list.sort( (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            return list
        },
        doingList: function () {
            let list =  this.tasks.filter(task => {
                return task.category == 'doing'
            })
            list = list.sort( (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            return list
        },
        doneList: function () {
            let list =  this.tasks.filter(task => {
                return task.category == 'done'
            })
            list = list.sort( (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            return list
        }
    }
}
</script>

<style>

dialog[open] {
    animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
}

dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
}


@keyframes appear {
from {
    opacity: 0;
    transform: translateX(-3rem);
}

to {
    opacity: 1;
    transform: translateX(0);
}
} 
</style>
