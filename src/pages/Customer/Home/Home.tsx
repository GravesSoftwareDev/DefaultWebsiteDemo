import ProductCard from '../../../Components/ProductCard/ProductCard'
import type { Product } from '../../../Types'
import HeroCarousel from './HeroCarousel/HeroCarousel'
import './Home.css'
import { Link } from 'react-router'

export default function Home({ productsData, }: { productsData: Product[] | null }) {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="left-hero">
                    <h1>Welcome to Demo Store</h1>

                    <p>
                        Your one-stop shop for finding the perfect
                        product.
                    </p>

                    <Link to="/Customer/products" className="hero-cta">
                        Shop Now →
                    </Link>
                </div>
                <div className="right-hero">
                    {productsData && productsData.length > 0 && (
                        <HeroCarousel products={productsData} />
                    )}
                </div>
            </section>

            <section className="featured-section">
                <h2>Featured Products</h2>

                {productsData && productsData.length > 0 ? (
                    <div className="products-grid">
                        {productsData.slice(0, 3).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}

                        <Link to="/Customer/Products" className="see-more-card">
                            <div className="see-more-content">
                                <h3>See All Products</h3>
                                <p>
                                    Browse our full catalog and find exactly
                                    what you're looking for.
                                </p>
                            </div>
                            <span className="see-more-arrow">→</span>
                        </Link>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No featured Products available.</p>
                    </div>
                )}
            </section>
        </div>
    )
}