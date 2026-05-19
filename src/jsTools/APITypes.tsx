interface Product {
    id: number;
    name: string;
}

type ProductsState = {
  data: Product[] | null
  loading: boolean
  error: string | null
}


export type { Product, ProductsState };