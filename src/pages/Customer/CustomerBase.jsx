import CustomerNav from '../../Components/NavBars/CustomerNav/CustomerNav'
import { Outlet } from 'react-router'
import CustomerFooter from '../../Components/Footers/CustomerFooter/CustomerFooter'

export default function CustomerBase() {
    return (
        <div>
            <CustomerNav />
            <Outlet />
            <CustomerFooter/>
        </div>
    )
}