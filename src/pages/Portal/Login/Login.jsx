import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router'

export default function Login() {
    const { login, token } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    if (token) {
        navigate('/Portal/dashboard', { replace: true })
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(username, password)
            navigate('/Portal/dashboard', { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Portal Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
        </div>
    )
}
