export interface TaskInputProps {
    modelValue: string
    label?: string
    placeholder?: string
    type?: 'text' | 'number' | 'email' | 'password'
    required?: boolean
    disabled?: boolean
    maxLength?: number
    error?: string
    onKeyDown?: (event: KeyboardEvent) => void
}
