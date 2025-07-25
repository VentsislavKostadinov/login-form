'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { DEFAULT_LOCALE, LocaleProps } from '@/app/types/LocaleProps.types'
import { useLoading } from '../../../context/useLoading'
import './LanguageSwitch.scss'

export default function LanguageSwitch() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const { setLoading } = useLoading()
    const t = useTranslations('language')

    const locales: LocaleProps[] = ['en', 'bg']
    const locale = (searchParams.get('locale') as LocaleProps) || DEFAULT_LOCALE

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value
        const params = new URLSearchParams(searchParams.toString())
        params.set('locale', newLocale)

        try {
            const { setLanguageCookie } = await import(
                '../../../../actions/set-language-action'
            )
            await setLanguageCookie(newLocale)

            setLoading(true)

            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`)
                setLoading(false)
            })
        } catch (error) {
            console.error('Failed to switch language:', error)
        }
    }

    return (
        <nav>
            <select value={locale} onChange={handleChange} disabled={isPending}>
                {locales.map((loc) => (
                    <option key={loc} value={loc}>
                        {t(loc)}
                    </option>
                ))}
            </select>
        </nav>
    )
}
