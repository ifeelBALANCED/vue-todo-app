import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Task } from './types'

export const useTasksModel = defineStore('tasks', () => {
    const tasks = ref<Task[]>([])
    const nextId = ref(0)
    const taskFilter = ref<'all' | 'active' | 'completed'>('all')

    const activeTasks = computed(() => tasks.value.filter(task => !task.completed))
    const completedTasks = computed(() => tasks.value.filter(task => task.completed))
    const filteredTasks = computed(() => {
        switch (taskFilter.value) {
            case 'active':
                return activeTasks.value
            case 'completed':
                return completedTasks.value
            default:
                return tasks.value
        }
    })

    const addTask = (title: string) => {
        tasks.value = [...tasks.value, { id: nextId.value++, title, completed: false }]
    }

    const toggleTask = (id: number) => {
        tasks.value = tasks.value.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    }

    const deleteTask = (id: number) => {
        tasks.value = tasks.value.filter(task => task.id !== id)
    }

    return {
        tasks,
        nextId,
        taskFilter,
        activeTasks,
        completedTasks,
        filteredTasks,
        addTask,
        toggleTask,
        deleteTask
    }
})
