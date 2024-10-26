<script lang="ts" setup>
defineProps<{
    modelValue: 'all' | 'completed' | 'active'
}>()

const emit = defineEmits<{
    'update:modelValue': [value: 'all' | 'completed' | 'active']
}>()

const filters = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'active', label: 'Active' }
] as const
</script>

<template>
    <div class="flex justify-center space-x-4">
        <label
            v-for="filter in filters"
            :key="filter.value"
            :class="modelValue === filter.value ? 'text-purple-500' : 'text-gray-400'"
        >
            <input
                :checked="modelValue === filter.value"
                :value="filter.value"
                class="hidden"
                type="radio"
                @change="emit('update:modelValue', filter.value)"
            />
            <span class="cursor-pointer hover:text-purple-500 transition">{{ filter.label }}</span>
        </label>
    </div>
</template>
