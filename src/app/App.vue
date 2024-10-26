<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { TaskInput } from '@/shared/ui'
import { useTasksModel } from '@/entities/task'

const newTodoText = ref('')
const tasksStore = useTasksModel()
const { taskFilter, filteredTasks } = storeToRefs(tasksStore)

function addNewTask() {
    if (!newTodoText.value) {
        return
    }
    tasksStore.addTask(newTodoText.value)
    newTodoText.value = ''
}
</script>

<template>
    <section class="bg-[#0D0714] min-h-screen p-8 text-white">
        <!-- Input Section -->
        <div class="flex justify-center mb-6">
            <div
                class="flex items-center space-x-2 bg-[#1c1327] px-4 py-2 rounded-full border border-purple-500 max-w-md"
            >
                <TaskInput v-model="newTodoText" placeholder="Enter new task" @keyup.enter="addNewTask" />
                <button
                    :disabled="!newTodoText"
                    class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="addNewTask"
                >
                    <span class="text-white text-2xl font-bold">+</span>
                </button>
            </div>
        </div>

        <!-- Filter Section -->
        <div class="flex justify-center space-x-4 mb-8">
            <label :class="taskFilter === 'all' ? 'text-purple-500' : 'text-gray-400'">
                <input v-model="taskFilter" class="hidden" type="radio" value="all" />
                <span class="cursor-pointer hover:text-purple-500 transition">All</span>
            </label>
            <label :class="taskFilter === 'completed' ? 'text-purple-500' : 'text-gray-400'">
                <input v-model="taskFilter" class="hidden" type="radio" value="completed" />
                <span class="cursor-pointer hover:text-purple-500 transition">Completed</span>
            </label>
            <label :class="taskFilter === 'active' ? 'text-purple-500' : 'text-gray-400'">
                <input v-model="taskFilter" class="hidden" type="radio" value="active" />
                <span class="cursor-pointer hover:text-purple-500 transition">Active</span>
            </label>
        </div>

        <div class="space-y-10">
            <div v-if="filteredTasks.length > 0">
                <h2 class="text-lg font-semibold mb-4">Tasks - {{ filteredTasks.length }}</h2>
                <ul>
                    <li
                        v-for="task in filteredTasks"
                        :key="task.id"
                        class="flex items-center justify-between p-4 mb-2 bg-[#1c1327] rounded-lg hover:bg-[#292030] transition"
                    >
                        <span
                            :class="{
                                'text-purple-300': !task.completed,
                                'text-purple-300 line-through': task.completed
                            }"
                        >
                            {{ task.title }}
                        </span>
                        <div class="flex space-x-4">
                            <button
                                v-if="!task.completed"
                                class="text-green-400 text-xl hover:text-green-500"
                                @click="tasksStore.toggleTask(task.id)"
                            >
                                ✔
                            </button>
                            <button
                                v-if="task.completed"
                                class="text-yellow-400 text-xl hover:text-yellow-500"
                                @click="tasksStore.toggleTask(task.id)"
                            >
                                ↩️
                            </button>
                            <button
                                class="text-red-400 text-xl hover:text-red-500"
                                @click="tasksStore.deleteTask(task.id)"
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p class="text-center text-gray-500">No tasks available for the selected filter.</p>
            </div>
        </div>
    </section>
</template>
