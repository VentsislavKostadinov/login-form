'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type LoadingContextType = {
    loading: boolean
    setLoading: (val: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (!context)
        throw new Error('useLoading must be used within LoadingProvider')
    return context
}
