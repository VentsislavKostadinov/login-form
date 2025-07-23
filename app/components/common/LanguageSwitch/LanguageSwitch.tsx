'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import './LanguageSwitch.scss'

export default function LanguageSwitch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const t = useTranslations('language')

    const locale = searchParams.get('locale') || 'en'

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value
        const params = new URLSearchParams(searchParams.toString())
        params.set('locale', newLocale)

        const { setLanguageCookie } = await import(
            '../../../../actions/set-language-action'
        )

        await setLanguageCookie(newLocale)

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
            router.refresh()
        })
    }

    return (
        <nav>
            <select value={locale} onChange={handleChange} disabled={isPending}>
                <option value="en">{t('en')}</option>
                <option value="bg">{t('bg')}</option>
            </select>
        </nav>
    )
}
