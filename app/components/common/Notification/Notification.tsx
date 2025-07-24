'use client'

import React, { ReactNode, useEffect } from 'react'
import './Notification.scss'

type NotificationProps = {
    variant: 'success' | 'error'
    onClose: () => void
    duration?: number
    children: ReactNode
}

export default function Notification({
    variant,
    onClose,
    duration = 3000,
    children,
}: NotificationProps) {
    useEffect(() => {
        if (variant === 'success') {
            const timer = setTimeout(onClose, duration)
            return () => clearTimeout(timer)
        }
    }, [variant, duration, onClose])

    return (
        <div className={`notification ${variant}`}>
            <span className="notification-content">{children}</span>
            <button
                className="notification-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                &times;
            </button>
        </div>
    )
}
