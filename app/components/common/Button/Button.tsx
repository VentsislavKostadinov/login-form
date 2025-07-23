'use client'

import React, { ButtonHTMLAttributes } from 'react'
import './Button.scss'

type AlignOptions = 'left' | 'center' | 'right'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger'
    text: string
    align?: AlignOptions
}

export default function Button({
    variant = 'primary',
    text,
    align = 'center',
    className = '',
    ...props
}: ButtonProps) {
    const wrapperClass = `button-wrapper button-align-${align}`

    return (
        <div className={wrapperClass}>
            <button className={`btn btn-${variant} ${className}`} {...props}>
                {text}
            </button>
        </div>
    )
}
