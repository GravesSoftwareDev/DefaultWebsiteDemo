import { NavLink } from 'react-router'
import './CustomerNav.css'

export default function CustomerNav() {
    return (
        <header className="customer-nav">
            <NavLink to="/Customer" className="nav-brand" end>
                Demo <span>Store</span>
            </NavLink>
            <nav className="nav-links">
                <NavLink to="/Customer" end>Home</NavLink>
                <NavLink to="/Customer/products">Products</NavLink>
                <NavLink to="/Customer/contact">Contact</NavLink>
            </nav>
        </header>
    )
}
