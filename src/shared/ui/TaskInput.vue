<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

defineProps<{
    placeholder?: string
    disabled?: boolean
}>()

const emit = defineEmits<{
    submit: [value: string]
}>()

const inputValue = ref('')

function handleSubmit() {
    if (!inputValue.value.trim()) return

    emit('submit', inputValue.value)
    inputValue.value = ''
}
</script>

<template>
    <div class="flex items-center space-x-2 bg-[#1c1327] px-4 py-2 rounded-full border border-purple-500">
        <input
            v-model="inputValue"
            :placeholder="placeholder"
            class="flex-1 bg-transparent focus:outline-none text-white"
            type="text"
            @keydown.enter="handleSubmit"
        />
        <button
            :disabled="!inputValue.trim() || disabled"
            class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleSubmit"
        >
            <span class="text-white text-2xl font-bold">+</span>
        </button>
    </div>
</template>
