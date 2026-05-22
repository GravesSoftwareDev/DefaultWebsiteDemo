import { createContext, useContext, useEffect, useState } from 'react'

type User = {
    id: number
    username: string
    is_staff: boolean
}

type AuthContextType = {
    token: string | null
    user: User | null
    loading: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            setLoading(false)
            return
        }
        fetch('/auth/user/', {
            headers: { Authorization: `Token ${token}` },
        })
            .then(res => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then(data => setUser(data))
            .catch(() => {
                localStorage.removeItem('token')
                setToken(null)
            })
            .finally(() => setLoading(false))
    }, [])

    const login = async (username: string, password: string) => {
        const res = await fetch('/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        if (!res.ok) throw new Error('Invalid username or password.')
        const { token: newToken } = await res.json()

        const userRes = await fetch('/auth/user/', {
            headers: { Authorization: `Token ${newToken}` },
        })
        const userData = await userRes.json()

        localStorage.setItem('token', newToken)
        setToken(newToken)
        setUser(userData)
    }

    const logout = async () => {
        if (token) {
            await fetch('/auth/logout/', {
                method: 'POST',
                headers: { Authorization: `Token ${token}` },
            }).catch(() => {})
        }
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
