'use client'

import { useTranslations } from 'next-intl'
import Form from '../components/common/Form/Form'
import Input from '../components/common/Input/Input'
import Button from '../components/common/Button/Button'
import Hyperlink from '../components/common/Hyperlink/Hyperlink'

export default function LoginPage() {
    const t = useTranslations('loginPage')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <Form handleSubmit={handleSubmit} title={t('title')}>
            <Input
                id="email-address"
                label={t('email')}
                type="email"
                placeholder={t('placeholderEmail')}
            />
            <Input
                id="password"
                label={t('password')}
                type="password"
                placeholder={t('placeholderPassword')}
            />
            <Button text={t('login')} type="submit" />
            <Hyperlink text={t('forgot')} path="/forgot-password" />
        </Form>
    )
}
