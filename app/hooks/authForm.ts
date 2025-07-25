import { useState } from 'react'
import { validateEmail } from '../utils/validateEmail'

export type AuthFormOptions = {
    includePassword?: boolean
}

export function useAuthForm(options?: AuthFormOptions) {
    const { includePassword = true } = options || {}

    const [formData, setFormData] = useState<{
        email: string
        password?: string
    }>({
        email: '',
        ...(includePassword ? { password: '' } : {}),
    })

    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (name === 'email' && emailError && validateEmail(value)) {
            setEmailError(null)
        }

        if (
            includePassword &&
            name === 'password' &&
            passwordError &&
            value.length >= 4
        ) {
            setPasswordError(null)
        }
    }

    const validate = (): boolean => {
        let valid = true
        if (!validateEmail(formData.email)) {
            setEmailError('Invalid email address')
            valid = false
        }
        if (includePassword) {
            if (!formData.password || formData.password.length < 4) {
                setPasswordError('Password must be at least 4 characters')
                valid = false
            }
        }
        return valid
    }

    const resetForm = () => {
        setFormData({
            email: '',
            ...(includePassword ? { password: '' } : {}),
        })
        setEmailError(null)
        setPasswordError(null)
    }

    return {
        formData,
        emailError,
        passwordError,
        setEmailError,
        setPasswordError,
        handleChange,
        validate,
        resetForm,
    }
}
