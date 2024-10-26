<!-- TodoApp.vue -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useTasksModel } from '@/entities/task'
import { TaskFilter, TaskInput, TaskItem } from '@/shared/ui'

const tasksStore = useTasksModel()
const { taskFilter, filteredTasks } = storeToRefs(tasksStore)

function handleNewTask(taskText: string) {
    tasksStore.addTask(taskText)
}

function updateFilter(value: 'all' | 'completed' | 'active') {
    taskFilter.value = value
}
</script>

<template>
    <section class="bg-[#0D0714] min-h-screen p-8 text-white">
        <div class="flex justify-center mb-6">
            <div class="max-w-md w-full">
                <TaskInput placeholder="Add a new task..." @submit="handleNewTask" />
            </div>
        </div>

        <div class="mb-8">
            <TaskFilter :model-value="taskFilter" @update:model-value="updateFilter" />
        </div>

        <div class="space-y-10">
            <div v-if="filteredTasks.length > 0">
                <h2 class="text-lg font-semibold mb-4">Tasks - {{ filteredTasks.length }}</h2>
                <ul>
                    <TaskItem
                        v-for="task in filteredTasks"
                        :key="task.id"
                        :task="task"
                        @delete="tasksStore.deleteTask"
                        @toggle="tasksStore.toggleTask"
                    />
                </ul>
            </div>
            <div v-else>
                <p class="text-center text-gray-500">No tasks available for the selected filter.</p>
            </div>
        </div>
    </section>
</template>
