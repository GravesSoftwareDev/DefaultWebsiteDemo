// Types.ts

export type ProductImg = {
    id: number
    image: string
    alt_text?: string
    order: number
}

export type Product = {
    id: number
    title: string
    description: string
    published: boolean
    release_date: string
    created: string
    updated: string
    price: string
    hero_image: string | null
    gallery: ProductImg[]
}

export type Contact = {
    id: number
    first_name: string
    last_name?: string
    email: string
    phone_num?: string
    message: string
    created: string
    read: boolean
}

export type ProductsState = {
    data: Product[] | null
    loading: boolean
    error: string | null
}