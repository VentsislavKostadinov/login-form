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

export default function ForgotPasswordPage() {
    const t = useTranslations()
    const { loading } = useLoading()
    const {
        authCredentials,
        setSuccessAuth,
        setErrorAuth,
        successAuth,
        errorAuth,
    } = useAuth()

    const { formData, emailError, handleChange, validate, resetForm } =
        useAuthForm({ includePassword: false })

    const [showNotification, setShowNotification] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validate()) return

        if (formData.email === authCredentials.email) {
            setSuccessAuth(t('messages.resetEmailSent'))
            setErrorAuth(null)
            resetForm()
        } else {
            setErrorAuth(t('messages.emailNotFound'))
            setSuccessAuth(null)
        }

        setShowNotification(true)
    }

    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <Form
                        handleSubmit={onSubmit}
                        title={t('loginPage.forgotTitle')}
                    >
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
                        <Button
                            disabled={!formData.email}
                            text={t('loginPage.send')}
                            type="submit"
                        />
                        <Hyperlink
                            text={t('loginPage.backToLogin')}
                            path="/login"
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
