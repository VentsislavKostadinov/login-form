'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import Input from '../components/common/Input/Input'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'
import { CredentialProps, useAuth } from '../context/authContext'

export default function LoginPage() {
    const t = useTranslations('loginPage')
    const [formData, setFormData] = useState<CredentialProps>({
        email: '',
        password: '',
    })

    const { handleSubmit, success, error } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password } = formData

        handleSubmit(email, password)

        if (!!success) {
            setFormData({ email: '', password: '' })
        }
    }

    return (
        <Form handleSubmit={onSubmit} title={t('title')}>
            <Input
                id="email-address"
                name="email"
                value={formData.email}
                label={t('email')}
                type="email"
                placeholder={t('placeholderEmail')}
                onChange={handleChange}
            />
            <Input
                id="password"
                name="password"
                value={formData.password}
                label={t('password')}
                type="password"
                placeholder={t('placeholderPassword')}
                onChange={handleChange}
            />
            <Button text={t('login')} type="submit" />
            <Hyperlink text={t('forgot')} path="/forgot-password" />
        </Form>
    )
}
