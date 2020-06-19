<template>
    <div :class="`${own} bg-white shadow flex flex-col rounded px-3 pt-3 pb-5 border border-white mt-3 mb-3 mx-3 cursor-move`">
        <span class="font-bold mb-3">{{ task.title }}</span>
        <div class="flex items-center">
            <div class="text-sm">
                <p class="text-gray-900 leading-none">{{ task.User.email}}</p>
                <p class="text-gray-600">{{ task.updatedAt | dataFormat }}</p>
            </div>
        </div>
        <div class="flex mt-3">
            <button v-if="own == 'own'" @click.prevent="$emit('edit', task.id)" class="inline-block rounded-full text-white bg-blue-700 px-2 py-1 text-xs font-bold mr-3">Edit</button>
            <button v-if="own == 'own'" @click.prevent="$emit('delete', task.id)" class="inline-block rounded-full text-white bg-red-700 px-2 py-1 text-xs font-bold mr-3">Delete</button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'Task',
    props: ['task','own'],
    filters: {
        dataFormat: function (value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        }
    }
}
</script>

<style>

</style>