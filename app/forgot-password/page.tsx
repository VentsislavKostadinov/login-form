'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import InputField from '../components/common/InputField/InputField'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'
import { useAuth } from '../context/authContext'
import NotificationWrapper from '../components/common/Notification/NotificationWrapper'

export default function ForgotPasswordPage() {
    const t = useTranslations()
    const [email, setEmail] = useState('')
    const { authCredentials, setSuccess, setError, success, error } = useAuth()
    const [showNotification, setShowNotification] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email === authCredentials.email) {
            setSuccess(t('messages.resetEmailSent'))
            setError(null)
            setEmail('')
        } else {
            setError(t('messages.emailNotFound'))
            setSuccess(null)
        }

        setShowNotification(true)
    }

    return (
        <>
            <Form handleSubmit={onSubmit} title={t('loginPage.forgotTitle')}>
                <InputField
                    id="email-address"
                    name="email"
                    value={email}
                    label={t('loginPage.email')}
                    type="email"
                    placeholder={t('loginPage.placeholderEmail')}
                    onChange={handleChange}
                />
                <Button
                    disabled={!email}
                    text={t('loginPage.send')}
                    type="submit"
                />
                <Hyperlink text={t('loginPage.backToLogin')} path="/login" />
            </Form>

            <NotificationWrapper
                show={showNotification}
                success={success}
                error={error}
                onClose={() => setShowNotification(false)}
            />
        </>
    )
}
