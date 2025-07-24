import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import LanguageSwitch from './components/common/LanguageSwitch/LanguageSwitch'
import { AuthProvider } from './context/authContext'
import './globals.scss'

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AuthProvider>
                        <LanguageSwitch />
                        {children}
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
