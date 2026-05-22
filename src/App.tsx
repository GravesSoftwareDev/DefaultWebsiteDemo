import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Home from './pages/Customer/Home/Home.tsx'
import Products from './pages/Customer/Products/Products.tsx'
import CustomerBase from './pages/Customer/CustomerBase.jsx'
import PortalBase from './pages/Portal/PortalBase.jsx'
import Login from './pages/Portal/Login/Login.jsx'
import Dashboard from './pages/Portal/Dashboard/Dashboard.jsx'
import Contact from './pages/Customer/Contact/Contact.tsx'
import Product from './pages/Customer/Product/Product.tsx'
import { useEffect, useState } from 'react'
import { fetchPublishedProducts } from './jsTools/API.js'
import type { ProductsState } from './Types'

function App() {
  const [productsData, setProductsData] = useState<ProductsState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if(productsData.data || productsData.error) {
      return
    }
    async function loadProducts() {
      try {
        const data = await fetchPublishedProducts()

        setProductsData({
          data,
          loading: false,
          error: null,
        })
      } catch (error) {
        setProductsData({
          data: null,
          loading: false,
          error: error.message,
        })
      }
    }

    loadProducts()
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Customer" element={<CustomerBase />}>
          <Route index element={<Home productsData={productsData.data} />} />
          <Route path="products" element={<Products productsData={productsData.data} />}/>
          <Route path="contact" element={<Contact />} />
          <Route path="product/:id" element={<Product productsData={productsData.data} />} />
          <Route path="*" element={<Navigate to="/Customer" replace />} />
        </Route>

        <Route path="/Portal" element={<PortalBase />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/Customer" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App