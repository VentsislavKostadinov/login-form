'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import InputField from '../components/common/InputField/InputField'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'
import { CredentialProps, useAuth } from '../context/authContext'
import NotificationWrapper from '../components/common/Notification/NotificationWrapper'
import { useLoading } from '../context/useLoading'
import LoadingIndicator from '../components/common/LoadingIndicator/LoadingIndicator'

export default function LoginPage() {
    const t = useTranslations()
    const { loading } = useLoading()
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
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <Form handleSubmit={onSubmit} title={t('loginPage.title')}>
                        <InputField
                            id="email-address"
                            name="email"
                            value={formData.email}
                            label={t('loginPage.email')}
                            type="email"
                            placeholder={t('loginPage.placeholderEmail')}
                            onChange={handleChange}
                        />
                        <InputField
                            id="password"
                            name="password"
                            value={formData.password}
                            label={t('loginPage.password')}
                            type="password"
                            placeholder={t('loginPage.placeholderPassword')}
                            onChange={handleChange}
                        />
                        <Button
                            disabled={!formData.email || !formData.password}
                            text={t('loginPage.login')}
                            type="submit"
                        />
                        <Hyperlink
                            text={t('loginPage.forgot')}
                            path="/forgot-password"
                        />
                    </Form>
                    <NotificationWrapper
                        show={showNotification}
                        success={success}
                        error={error}
                        onClose={() => setShowNotification(false)}
                    />
                </>
            )}
        </>
    )
}
