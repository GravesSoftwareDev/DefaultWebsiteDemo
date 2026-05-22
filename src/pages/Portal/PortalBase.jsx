import PortalNav from '../../Components/NavBars/PortalNav/PortalNav'
import { Outlet } from 'react-router'

export default function PortalBase() {
    return (
        <div>
            <PortalNav />
            <Outlet />
            <h1>Portal Base Page</h1>
        </div>
    )
}