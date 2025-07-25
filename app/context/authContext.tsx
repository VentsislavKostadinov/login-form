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
    password?: string
}

type AuthContextProps = {
    authCredentials: CredentialProps
    isAuthenticated: boolean
    errorAuth: string | null
    successAuth: string | null
    login: (email: string, password?: string) => boolean
    handleSubmit: (email: string, password?: string) => boolean
    setErrorAuth: (msg: string | null) => void
    setSuccessAuth: (msg: string | null) => void
}

const defaultCredentials: CredentialProps = {
    email: '',
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authCredentials, setAuthCredentials] =
        useState<CredentialProps>(defaultCredentials)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorAuth, setErrorAuth] = useState<string | null>(null)
    const [successAuth, setSuccessAuth] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_CREDENTIALS_URL}`,
                )
                if (!res.ok) throw new Error('Failed to load credentials')
                const creds: CredentialProps = await res.json()
                setAuthCredentials(creds)
                setErrorAuth(null)
            } catch {
                setErrorAuth('Could not load credentials')
            }
        }
        loadCredentials()
    }, [])

    const login = (email: string, password?: string): boolean => {
        const passwordMatch =
            authCredentials.password === undefined ||
            authCredentials.password === password

        if (authCredentials.email === email && passwordMatch) {
            setIsAuthenticated(true)
            setErrorAuth(null)
            setSuccessAuth('Login successful!')
            return true
        } else {
            setIsAuthenticated(false)
            setErrorAuth('Invalid credentials')
            setSuccessAuth(null)
            return false
        }
    }

    const handleSubmit = (email: string, password?: string): boolean => {
        return login(email, password)
    }

    return (
        <AuthContext.Provider
            value={{
                authCredentials,
                isAuthenticated,
                errorAuth,
                successAuth,
                login,
                handleSubmit,
                setErrorAuth,
                setSuccessAuth,
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
