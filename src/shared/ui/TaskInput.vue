<script lang="ts" setup>
import type { TaskInputProps } from './types'

withDefaults(defineProps<TaskInputProps>(), {
    placeholder: 'Add a new task',
    type: 'text',
    disabled: false,
    required: false
})

const emit = defineEmits<{
    update: [value: string]
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update', target.value)
}
</script>

<template>
    <input
        :disabled="disabled"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        class="bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
        @input="handleInput"
    />
</template>

<style scoped></style>
