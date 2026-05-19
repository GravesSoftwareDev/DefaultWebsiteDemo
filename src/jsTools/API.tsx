import type { Product } from './APITypes'

const fetchProducts: () => Promise<Product[]> = async () => {
    return [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }]
}

export { fetchProducts }