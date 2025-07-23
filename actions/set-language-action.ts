'use server'

import { cookies } from 'next/headers'

export async function setLanguageCookie(locale: string) {
    ;(await cookies()).set({
        name: 'language',
        value: locale,
        path: '/',
    })
}
