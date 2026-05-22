import type { Product, Contact } from '../Types'

const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('/endpoints/products/')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
}

const fetchProductById = async (
    productId: number
): Promise<Product | null> => {
    const res = await fetch(`/endpoints/products/${productId}/`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json()
}

const fetchPublishedProducts = async (): Promise<Product[]> => {
    return fetchProducts()
}

const searchProducts = async (searchTerm: string): Promise<Product[]> => {
    const products = await fetchProducts()
    const lower = searchTerm.toLowerCase()
    return products.filter(
        p =>
            p.title.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower)
    )
}

const submitContactForm = async (
    contactData: Omit<Contact, 'id' | 'created' | 'read'>
): Promise<Contact> => {
    const res = await fetch('/endpoints/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
    })
    if (!res.ok) throw new Error('Failed to submit contact form')
    return res.json()
}

export {
    fetchProducts,
    fetchProductById,
    fetchPublishedProducts,
    searchProducts,
    submitContactForm,
}
