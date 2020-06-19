<template>
    <div class="bg-white rounded-lg rounded shadow pb-4">
        <div :class="`w-full bg-${category.color}-500 px-3 py-1 rounded-t-md`">
            <span class="font-bold text-white">{{ category.name }}</span>
        </div>
        <draggable group="tasks" draggable=".own" animation=200 @add="changeCategory($event.item.getAttribute('task-id'), category.name)" class="overflow-y-auto" style="min-height: 60vh;max-height: 70vh;">
            <slot/>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Task from './Task'

export default {
    name: 'BoxCategory',
    components: {
        draggable,
        Task
    },
    props: ['category','own'],
    methods: {
        changeCategory(taskId, category){
            const task = {
                id: taskId,
                category: category.toLowerCase()
            }
            this.$emit('moveTask', task)
            console.log(`Task ${taskId} moved to ${category}`)
        }
    }
}
</script>

<style>

</style>