'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import InputField from '../components/common/InputField/InputField'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'
import NotificationWrapper from '../components/common/Notification/NotificationWrapper'
import LoadingIndicator from '../components/common/LoadingIndicator/LoadingIndicator'
import { useLoading } from '../context/useLoading'
import { useAuth } from '../context/authContext'
import { useAuthForm } from '../hooks/authForm'

export default function LoginPage() {
    const t = useTranslations()
    const { loading } = useLoading()
    const { handleSubmit, successAuth, errorAuth } = useAuth()
    const {
        formData,
        emailError,
        passwordError,
        handleChange,
        validate,
        resetForm,
    } = useAuthForm({ includePassword: true })

    const [showNotification, setShowNotification] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validate()) return

        const success = handleSubmit(formData.email, formData.password)

        if (success) {
            resetForm()
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
                            error={emailError || undefined}
                        />
                        <InputField
                            id="password"
                            name="password"
                            value={formData.password || ''}
                            label={t('loginPage.password')}
                            type="password"
                            placeholder={t('loginPage.placeholderPassword')}
                            onChange={handleChange}
                            error={passwordError || undefined}
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
                        success={successAuth}
                        error={errorAuth}
                        onClose={() => setShowNotification(false)}
                    />
                </>
            )}
        </>
    )
}
