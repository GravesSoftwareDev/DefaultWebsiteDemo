import { useState, useEffect } from 'react'
import { fetchAllProducts, deleteProduct } from '../../../jsTools/API'
import ProductForm from './ProductForm'

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formProduct, setFormProduct] = useState(undefined) // undefined = closed

    const load = async () => {
        setLoading(true)
        setError(null)
        try {
            setProducts(await fetchAllProducts())
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return
        try {
            await deleteProduct(product.id)
            setProducts(prev => prev.filter(p => p.id !== product.id))
        } catch (e) {
            window.alert('Could not delete product: ' + e.message)
        }
    }

    const handleSaved = () => {
        setFormProduct(undefined)
        load()
    }

    const published = products.filter(p => p.published).length

    return (
        <>
            <div className="list-toolbar">
                <div className="list-stats">
                    <span className="stat-chip">{products.length} total</span>
                    <span className="stat-chip published">{published} published</span>
                    <span className="stat-chip draft">{products.length - published} drafts</span>
                </div>
                <button className="btn-primary" onClick={() => setFormProduct(null)}>
                    + Add Product
                </button>
            </div>

            {loading && <div className="list-state">Loading products…</div>}
            {error && <div className="list-state error">{error}</div>}

            {!loading && !error && products.length === 0 && (
                <div className="list-empty">
                    <p>No products yet.</p>
                    <button className="btn-primary" onClick={() => setFormProduct(null)}>Add your first product</button>
                </div>
            )}

            {!loading && products.length > 0 && (
                <div className="product-table">
                    <div className="product-table-head">
                        <span>Product</span>
                        <span>Price</span>
                        <span>Status</span>
                        <span>Release Date</span>
                        <span></span>
                    </div>
                    {products.map(product => (
                        <div key={product.id} className="product-row">
                            <div className="product-row-name">
                                <div className="product-row-thumb">
                                    {product.hero_image
                                        ? <img src={product.hero_image} alt={product.title} />
                                        : <span>No image</span>
                                    }
                                </div>
                                <span className="product-row-title">{product.title}</span>
                            </div>
                            <span className="product-row-price">${product.price}</span>
                            <span className={`status-badge ${product.published ? 'published' : 'draft'}`}>
                                {product.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="product-row-date">{product.release_date}</span>
                            <div className="product-row-actions">
                                <button className="btn-edit" onClick={() => setFormProduct(product)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(product)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {formProduct !== undefined && (
                <ProductForm
                    product={formProduct}
                    onSave={handleSaved}
                    onCancel={() => setFormProduct(undefined)}
                />
            )}
        </>
    )
}
