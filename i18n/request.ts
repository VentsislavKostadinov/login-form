import { LocaleProps, DEFAULT_LOCALE } from '@/app/types/LocaleProps.types'
import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
    const cookieStore = cookies()
    const locale =
        ((await cookieStore).get('language')?.value as LocaleProps) ||
        DEFAULT_LOCALE

    return {
        locale,
        messages: (await import(`../public/locales/${locale}.json`)).default,
    }
})
