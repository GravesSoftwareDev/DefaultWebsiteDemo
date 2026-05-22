import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../../context/AuthContext'
import './PortalNav.css'

export default function PortalNav() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/Portal')
    }

    const initial = user?.username?.[0]?.toUpperCase() ?? '?'

    return (
        <aside className="portal-sidebar">
            <div className="sidebar-brand">
                Demo <span>Store</span>
                <span className="sidebar-brand-badge">Portal</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/Portal/dashboard" className="sidebar-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-avatar">{initial}</div>
                    <div className="sidebar-user-info">
                        <span className="sidebar-username">{user?.username}</span>
                        <span className="sidebar-role">{user?.is_staff ? 'Admin' : 'User'}</span>
                    </div>
                </div>
                <button className="sidebar-logout" onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
