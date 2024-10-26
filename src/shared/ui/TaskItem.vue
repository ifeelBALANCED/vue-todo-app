<script lang="ts" setup>
interface Task {
    id: number
    title: string
    completed: boolean
}

defineProps<{
    task: Task
}>()

const emit = defineEmits<{
    toggle: [id: number]
    delete: [id: number]
}>()
</script>

<template>
    <li class="flex items-center justify-between p-4 mb-2 bg-[#1c1327] rounded-lg hover:bg-[#292030] transition">
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
                @click="emit('toggle', task.id)"
            >
                ✔
            </button>
            <button
                v-if="task.completed"
                class="text-yellow-400 text-xl hover:text-yellow-500"
                @click="emit('toggle', task.id)"
            >
                ↩️
            </button>
            <button class="text-red-400 text-xl hover:text-red-500" @click="emit('delete', task.id)">🗑️</button>
        </div>
    </li>
</template>
