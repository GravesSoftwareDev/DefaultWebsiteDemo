import { NavLink } from 'react-router'
import './CustomerNav.css'

export default function CustomerNav() {
    return (
        <nav>
            <NavLink to="/Customer" end>Home</NavLink>
            <NavLink to="/Customer/properties">Properties</NavLink>
            <NavLink to="/Customer/contact">Contact</NavLink>
            <NavLink to="/Customer/applications">Applications</NavLink>
        </nav>
    )
}