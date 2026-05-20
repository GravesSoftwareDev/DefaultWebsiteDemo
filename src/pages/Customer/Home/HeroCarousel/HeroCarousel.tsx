import { useState } from 'react'
import ProductCard from '../../../../Components/ProductCard/ProductCard.tsx'
import type { Product } from '../../../../Types.tsx'
import './HeroCarousel.css'

export default function HeroCarousel({ products }: { products: Product[] }) {
    const [current, setCurrent] = useState(0)
    const visible = 2
    const max = products.length - visible

    const go = (idx: number) => setCurrent(Math.max(0, Math.min(idx, max)))
    const steps = Math.max(1, products.length - visible + 1)

    return (
        <div className="hero-carousel">
            <div className="hero-carousel-track-outer">
                <div
                    className="hero-carousel-track"
                    style={{ transform: `translateX(-${current * (240 + 20)}px)` }}
                >
                    {products.map((product) => (
                        <div className="hero-carousel-item" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-carousel-controls">
                <div className="hero-carousel-dots">
                    {Array.from({ length: steps }).map((_, i) => (
                        <button
                            key={i}
                            className={`hero-dot${i === current ? ' active' : ''}`}
                            onClick={() => go(i)}
                        />
                    ))}
                </div>
                <div className="hero-carousel-arrows">
                    <button
                        className="hero-arr"
                        onClick={() => go(current - 1)}
                        disabled={current === 0}
                        aria-label="Previous"
                    >
                        ←
                    </button>
                    <button
                        className="hero-arr"
                        onClick={() => go(current + 1)}
                        disabled={current >= max}
                        aria-label="Next"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    )
}