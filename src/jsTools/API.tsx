import type { Product, Contact } from '../Types'

const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))

const mockProducts: Product[] = [
    {
        id: 1,
        title: "Gaming Keyboard",
        description: "Mechanical RGB gaming keyboard with blue switches.",
        published: true,
        release_date: "2025-01-10",
        created: "2025-01-01",
        updated: "2025-02-15",
        price: "89.99",
        hero_image: "/images/keyboard-hero.jpg",
        gallery: [
            {
                id: 1,
                image: "/images/keyboard-1.jpg",
                alt_text: "Gaming keyboard front view",
                order: 1
            },
            {
                id: 2,
                image: "/images/keyboard-2.jpg",
                alt_text: "Gaming keyboard side view",
                order: 2
            }
        ]
    },
    {
        id: 2,
        title: "Wireless Mouse",
        description: "Lightweight wireless gaming mouse.",
        published: true,
        release_date: "2025-03-01",
        created: "2025-02-20",
        updated: "2025-03-05",
        price: "49.99",
        hero_image: null,
        gallery: [
            {
                id: 3,
                image: "/images/mouse-1.jpg",
                alt_text: "Wireless mouse",
                order: 1
            }
        ]
    },
    {
        id: 3,
        title: "UltraWide Monitor",
        description: "34 inch ultrawide monitor for productivity.",
        published: false,
        release_date: "2025-06-15",
        created: "2025-04-01",
        updated: "2025-04-20",
        price: "499.99",
        hero_image: "/images/monitor-hero.jpg",
        gallery: []
    },
    {
        id: 4,
        title: "Gaming Headset",
        description: "Surround sound gaming headset with noise cancellation.",
        published: true,
        release_date: "2025-02-18",
        created: "2025-02-01",
        updated: "2025-02-25",
        price: "79.99",
        hero_image: "/images/headset-hero.jpg",
        gallery: [
            {
                id: 4,
                image: "/images/headset-1.jpg",
                alt_text: "Gaming headset front view",
                order: 1
            }
        ]
    },
    {
        id: 5,
        title: "Webcam Pro",
        description: "1080p webcam with autofocus and built-in microphone.",
        published: true,
        release_date: "2025-01-28",
        created: "2025-01-15",
        updated: "2025-02-02",
        price: "59.99",
        hero_image: "/images/webcam-hero.jpg",
        gallery: []
    },
    {
        id: 6,
        title: "Laptop Stand",
        description: "Adjustable aluminum laptop stand.",
        published: true,
        release_date: "2025-04-10",
        created: "2025-03-25",
        updated: "2025-04-12",
        price: "39.99",
        hero_image: null,
        gallery: [
            {
                id: 5,
                image: "/images/stand-1.jpg",
                alt_text: "Laptop stand side angle",
                order: 1
            }
        ]
    },
    {
        id: 7,
        title: "USB-C Dock",
        description: "Multi-port USB-C docking station for laptops.",
        published: true,
        release_date: "2025-05-05",
        created: "2025-04-18",
        updated: "2025-05-06",
        price: "129.99",
        hero_image: "/images/dock-hero.jpg",
        gallery: []
    },
    {
        id: 8,
        title: "Portable SSD",
        description: "1TB high-speed portable SSD storage device.",
        published: false,
        release_date: "2025-07-01",
        created: "2025-06-10",
        updated: "2025-06-15",
        price: "149.99",
        hero_image: "/images/ssd-hero.jpg",
        gallery: [
            {
                id: 6,
                image: "/images/ssd-1.jpg",
                alt_text: "Portable SSD device",
                order: 1
            }
        ]
    },
    {
        id: 9,
        title: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with deep bass.",
        published: true,
        release_date: "2025-03-20",
        created: "2025-03-01",
        updated: "2025-03-22",
        price: "69.99",
        hero_image: "/images/speaker-hero.jpg",
        gallery: []
    },
    {
        id: 10,
        title: "Smartwatch",
        description: "Fitness-focused smartwatch with heart rate monitoring.",
        published: true,
        release_date: "2025-05-15",
        created: "2025-05-01",
        updated: "2025-05-16",
        price: "199.99",
        hero_image: "/images/watch-hero.jpg",
        gallery: [
            {
                id: 7,
                image: "/images/watch-1.jpg",
                alt_text: "Smartwatch display",
                order: 1
            }
        ]
    },
    {
        id: 11,
        title: "Mechanical Pencil",
        description: "Premium mechanical pencil for sketching and writing.",
        published: true,
        release_date: "2025-02-12",
        created: "2025-02-01",
        updated: "2025-02-13",
        price: "14.99",
        hero_image: null,
        gallery: []
    },
    {
        id: 12,
        title: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness.",
        published: true,
        release_date: "2025-01-30",
        created: "2025-01-20",
        updated: "2025-02-01",
        price: "34.99",
        hero_image: "/images/lamp-hero.jpg",
        gallery: [
            {
                id: 8,
                image: "/images/lamp-1.jpg",
                alt_text: "Desk lamp illuminated",
                order: 1
            }
        ]
    },
    {
        id: 13,
        title: "Office Chair",
        description: "Ergonomic office chair with lumbar support.",
        published: false,
        release_date: "2025-08-10",
        created: "2025-07-01",
        updated: "2025-07-05",
        price: "299.99",
        hero_image: "/images/chair-hero.jpg",
        gallery: []
    },
    {
        id: 14,
        title: "Graphics Tablet",
        description: "Digital drawing tablet with pressure sensitivity.",
        published: true,
        release_date: "2025-04-22",
        created: "2025-04-05",
        updated: "2025-04-23",
        price: "249.99",
        hero_image: "/images/tablet-hero.jpg",
        gallery: [
            {
                id: 9,
                image: "/images/tablet-1.jpg",
                alt_text: "Graphics tablet with stylus",
                order: 1
            }
        ]
    },
    {
        id: 15,
        title: "Wireless Charger",
        description: "Fast wireless charging pad for smartphones.",
        published: true,
        release_date: "2025-03-12",
        created: "2025-03-01",
        updated: "2025-03-14",
        price: "29.99",
        hero_image: "/images/charger-hero.jpg",
        gallery: []
    }
]

const fetchProducts = async (): Promise<Product[]> => {
    await delay(500)

    return mockProducts
}

const fetchProductById = async (
    productId: number
): Promise<Product | null> => {
    await delay(300)

    const product = mockProducts.find(
        product => product.id === productId
    )

    return product ?? null
}

const fetchPublishedProducts = async (): Promise<Product[]> => {
    await delay(400)

    return mockProducts.filter(product => product.published)
}

const searchProducts = async (
    searchTerm: string
): Promise<Product[]> => {
    await delay(300)

    const lowerCaseSearch = searchTerm.toLowerCase()

    return mockProducts.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearch) ||
        product.description.toLowerCase().includes(lowerCaseSearch)
    )
}

const submitContactForm = async (
    contactData: Omit<Contact, 'id' | 'created' | 'read'>
): Promise<Contact> => {
    await delay(1000)

    return {
        id: Math.floor(Math.random() * 10000),
        created: new Date().toISOString(),
        read: false,
        ...contactData
    }
}

export {
    fetchProducts,
    fetchProductById,
    fetchPublishedProducts,
    searchProducts,
    submitContactForm
}