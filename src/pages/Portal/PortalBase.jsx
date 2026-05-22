import PortalNav from '../../Components/NavBars/PortalNav/PortalNav'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import './PortalBase.css'

export default function PortalBase() {
    const { token, loading } = useAuth()

    if (loading) return null
    if (!token) return <Navigate to="/Portal" replace />

    return (
        <div className="portal-layout">
            <PortalNav />
            <main className="portal-content">
                <Outlet />
            </main>
        </div>
    )
}