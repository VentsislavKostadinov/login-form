'use client'

import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import Button from '../components/common/Button/Button'
import Input from '../components/common/Input/Input'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'

export default function ForgotPasswordPage() {
    const t = useTranslations('loginPage')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <Form handleSubmit={handleSubmit} title={t('forgotTitle')}>
            <Input
                id="email-address"
                label={t('email')}
                type="email"
                placeholder={t('placeholderEmail')}
            />
            <Button text={t('send')} type="submit" />
            <Hyperlink text={t('backToLogin')} path="/login" />
        </Form>
    )
}
