type Product = {
    id: number
    title: string
    description: string
    image?: string
}

type ProductsState = {
  data: Product[] | null
  loading: boolean
  error: string | null
}

export type { Product, ProductsState };