'use client'

import React from 'react'
import { useLoading } from '../../../context/useLoading'
import './LoadingIndicator.scss'

export default function LoadingIndicator() {
    const { loading } = useLoading()

    if (!loading) return null

    return (
        <div className="loading-overlay">
            <div className="loading-spinner">Loading...</div>
        </div>
    )
}
