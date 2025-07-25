import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import LanguageSwitch from './components/common/LanguageSwitch/LanguageSwitch'
import { AuthProvider } from './context/authContext'
import './globals.scss'
import { LoadingProvider } from './context/useLoading'
import LoadingIndicator from './components/common/LoadingIndicator/LoadingIndicator'

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
                    <LoadingProvider>
                        <AuthProvider>
                            <LanguageSwitch />
                            <LoadingIndicator />
                            {children}
                        </AuthProvider>
                    </LoadingProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
