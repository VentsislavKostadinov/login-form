'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import Input from '../components/common/Input/Input'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'
import { CredentialProps, useAuth } from '../context/authContext'
import Notification from '../components/common/Notification/Notification'

export default function LoginPage() {
    const t = useTranslations()
    const [formData, setFormData] = useState<CredentialProps>({
        email: '',
        password: '',
    })

    const { handleSubmit, success, error } = useAuth()
    const [showNotification, setShowNotification] = useState(false)

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

        if (success) {
            setFormData({ email: '', password: '' })
        }
        setShowNotification(true)
    }

    return (
        <>
            <Form handleSubmit={onSubmit} title={t('loginPage.title')}>
                <Input
                    id="email-address"
                    name="email"
                    value={formData.email}
                    label={t('loginPage.email')}
                    type="email"
                    placeholder={t('loginPage.placeholderEmail')}
                    onChange={handleChange}
                />
                <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    label={t('loginPage.password')}
                    type="password"
                    placeholder={t('loginPage.placeholderPassword')}
                    onChange={handleChange}
                />
                <Button text={t('loginPage.login')} type="submit" />
                <Hyperlink
                    text={t('loginPage.forgot')}
                    path="/forgot-password"
                />
            </Form>

            {showNotification && (success || error) && (
                <Notification
                    variant={success ? 'success' : 'error'}
                    onClose={() => setShowNotification(false)}
                >
                    {success
                        ? t('messages.successMessage')
                        : t('messages.errorMessage')}
                </Notification>
            )}
        </>
    )
}
