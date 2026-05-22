import type { Product, Contact } from '../Types'

// ─── Auth helper ─────────────────────────────────────────────────────────────

const authFetch = (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = localStorage.getItem('token')
    const isFormData = options.body instanceof FormData
    return fetch(url, {
        ...options,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...(token ? { Authorization: `Token ${token}` } : {}),
            ...options.headers,
        },
    })
}

// ─── Public product endpoints ─────────────────────────────────────────────────

const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('/endpoints/products/')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
}

const fetchProductById = async (productId: number): Promise<Product | null> => {
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

// ─── Public contact endpoint ──────────────────────────────────────────────────

const submitContactForm = async (
    contactData: Omit<Contact, 'id' | 'created' | 'read'>
): Promise<Contact> => {
    const res = await fetch('/endpoints/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
    })
    if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const messages = Object.entries(body)
            .flatMap(([, v]) => (Array.isArray(v) ? v : [v]))
            .join(' ')
        throw new Error(messages || 'Failed to submit contact form.')
    }
    return res.json()
}

// ─── Portal product endpoints (authenticated) ─────────────────────────────────

const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await authFetch('/endpoints/products/')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
}

const createProduct = async (data: FormData): Promise<Product> => {
    const res = await authFetch('/endpoints/products/', { method: 'POST', body: data })
    if (!res.ok) throw new Error('Failed to create product')
    return res.json()
}

const updateProduct = async (id: number, data: FormData): Promise<Product> => {
    const res = await authFetch(`/endpoints/products/${id}/`, { method: 'PATCH', body: data })
    if (!res.ok) throw new Error('Failed to update product')
    return res.json()
}

const deleteProduct = async (id: number): Promise<void> => {
    const res = await authFetch(`/endpoints/products/${id}/`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete product')
}

// ─── Portal contact endpoints (authenticated) ─────────────────────────────────

const fetchContacts = async (): Promise<Contact[]> => {
    const res = await authFetch('/endpoints/contacts/')
    if (!res.ok) throw new Error('Failed to fetch contacts')
    return res.json()
}

const updateContact = async (id: number, data: Partial<Contact>): Promise<Contact> => {
    const res = await authFetch(`/endpoints/contacts/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update contact')
    return res.json()
}

export {
    authFetch,
    fetchProducts,
    fetchProductById,
    fetchPublishedProducts,
    searchProducts,
    submitContactForm,
    fetchAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchContacts,
    updateContact,
}
