import type { Product } from '../Types'


const fetchProducts: () => Promise<Product[]> = async () => {
    return [
        { id: 1, title: "Product 1", description: "Description for Product 1" },
        { id: 2, title: "Product 2", description: "Description for Product 2" },
        { id: 3, title: "Product 3", description: "Description for Product 3" },
        { id: 4, title: "Product 4", description: "Description for Product 4" },
        { id: 5, title: "Product 5", description: "Description for Product 5" },
        { id: 6, title: "Product 6", description: "Description for Product 6" },
        { id: 7, title: "Product 7", description: "Description for Product 7" },
        { id: 8, title: "Product 8", description: "Description for Product 8" },
        { id: 9, title: "Product 9", description: "Description for Product 9" },
        { id: 10, title: "Product 10", description: "Description for Product 10" },
        { id: 11, title: "Product 11", description: "Description for Product 11" },
        { id: 12, title: "Product 12", description: "Description for Product 12" },
        { id: 13, title: "Product 13", description: "Description for Product 13" },
        { id: 14, title: "Product 14", description: "Description for Product 14" },
        { id: 15, title: "Product 15", description: "Description for Product 15" }
    ]
}

export { fetchProducts }