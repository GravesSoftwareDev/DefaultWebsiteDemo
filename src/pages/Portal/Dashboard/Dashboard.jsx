import { useState } from 'react'
import ProductList from './ProductList'
import ContactList from './ContactList'
import './Dashboard.css'

export default function Dashboard() {
    const [tab, setTab] = useState('products')

    return (
        <div className="dashboard">
            <div className="dash-header">
                <h1>Dashboard</h1>
            </div>

            <div className="dash-tabs">
                <button
                    className={`dash-tab ${tab === 'products' ? 'active' : ''}`}
                    onClick={() => setTab('products')}
                >
                    Products
                </button>
                <button
                    className={`dash-tab ${tab === 'contacts' ? 'active' : ''}`}
                    onClick={() => setTab('contacts')}
                >
                    Contact Submissions
                </button>
            </div>

            <div className="dash-body">
                {tab === 'products' ? <ProductList /> : <ContactList />}
            </div>
        </div>
    )
}
