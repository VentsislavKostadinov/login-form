'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import InputField from '../components/common/InputField/InputField'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'
import { useAuth } from '../context/authContext'
import NotificationWrapper from '../components/common/Notification/NotificationWrapper'
import { useLoading } from '../context/useLoading'
import LoadingIndicator from '../components/common/LoadingIndicator/LoadingIndicator'
import { validateEmail } from '../utils/validateEmail'

export default function ForgotPasswordPage() {
    const t = useTranslations()
    const { loading } = useLoading()
    const [email, setEmail] = useState('')
    const {
        authCredentials,
        setSuccessAuth,
        setErrorAuth,
        successAuth,
        errorAuth,
        emailError,
        setEmailError,
    } = useAuth()
    const [showNotification, setShowNotification] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)

        if (emailError && validateEmail(value)) {
            setEmailError(null)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setEmailError(t('messages.invalidEmail'))
            return
        }

        if (email === authCredentials.email) {
            setSuccessAuth(t('messages.resetEmailSent'))
            setErrorAuth(null)
            setEmail('')
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
                            value={email}
                            label={t('loginPage.email')}
                            type="email"
                            placeholder={t('loginPage.placeholderEmail')}
                            onChange={handleChange}
                            error={emailError || undefined}
                        />
                        <Button
                            disabled={!email}
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
