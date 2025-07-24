'use client'

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'

export type CredentialProps = {
    email: string
    password: string
}

type AuthContextProps = {
    authCredentials: CredentialProps
    isAuthenticated: boolean
    error: string | null
    success: string | null
    login: (email: string, password: string) => boolean
    logout: () => void
    handleSubmit: (email: string, password: string) => void
    setError: (msg: string | null) => void
    setSuccess: (msg: string | null) => void
}

const defaultCredentials: CredentialProps = {
    email: '',
    password: '',
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authCredentials, setAuthCredentials] =
        useState<CredentialProps>(defaultCredentials)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const res = await fetch('/credentials/credentials.json')
                if (!res.ok) throw new Error('Failed to load credentials')
                const creds: CredentialProps = await res.json()
                setAuthCredentials(creds)
                setError(null)
            } catch {
                setError('Could not load credentials')
            }
        }
        loadCredentials()
    }, [])

    const login = (email: string, password: string): boolean => {
        if (
            authCredentials.email === email &&
            authCredentials.password === password
        ) {
            setIsAuthenticated(true)
            setError(null)
            setSuccess('Login successful!')
            return true
        } else {
            setIsAuthenticated(false)
            setError('Invalid credentials')
            setSuccess(null)
            return false
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        setError(null)
        setSuccess(null)
    }

    const handleSubmit = (email: string, password: string) => {
        return login(email, password)
    }

    return (
        <AuthContext.Provider
            value={{
                authCredentials,
                isAuthenticated,
                error,
                success,
                login,
                logout,
                handleSubmit,
                setError,
                setSuccess,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
