import { useState } from 'react'
import { createProduct, updateProduct } from '../../../jsTools/API'

export default function ProductForm({ product, onSave, onCancel }) {
    const isEditing = product !== null

    const [form, setForm] = useState({
        title: product?.title ?? '',
        description: product?.description ?? '',
        price: product?.price ?? '',
        published: product?.published ?? false,
        release_date: product?.release_date ?? '',
    })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        const data = new FormData()
        data.append('title', form.title)
        data.append('description', form.description)
        data.append('price', form.price)
        data.append('published', form.published)
        data.append('release_date', form.release_date)
        if (imageFile) data.append('hero_image', imageFile)

        try {
            if (isEditing) {
                await updateProduct(product.id, data)
            } else {
                await createProduct(data)
            }
            onSave()
        } catch (e) {
            setError(e.message)
            setSaving(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="modal-close" onClick={onCancel} aria-label="Close">✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-field">
                        <label htmlFor="pf-title">Title</label>
                        <input
                            id="pf-title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Gaming Keyboard"
                            required
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="pf-desc">Description</label>
                        <textarea
                            id="pf-desc"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe the product…"
                            required
                        />
                    </div>

                    <div className="modal-row">
                        <div className="modal-field">
                            <label htmlFor="pf-price">Price</label>
                            <input
                                id="pf-price"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="29.99"
                                required
                            />
                        </div>
                        <div className="modal-field">
                            <label htmlFor="pf-date">Release Date</label>
                            <input
                                id="pf-date"
                                type="date"
                                name="release_date"
                                value={form.release_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-field">
                        <label>Image</label>
                        {product?.hero_image && !imageFile && (
                            <img src={product.hero_image} alt="Current" className="current-image" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setImageFile(e.target.files[0] ?? null)}
                        />
                        {isEditing && (
                            <span className="field-hint">Leave blank to keep the current image.</span>
                        )}
                    </div>

                    <div className="modal-field modal-toggle-field">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                name="published"
                                checked={form.published}
                                onChange={handleChange}
                            />
                            <span className="toggle-track">
                                <span className="toggle-thumb" />
                            </span>
                            <span>Published</span>
                        </label>
                        <span className="field-hint">Published products appear on the customer site.</span>
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={saving}>
                            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
