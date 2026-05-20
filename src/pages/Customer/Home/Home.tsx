import ProductCard from '../../../Components/ProductCard/ProductCard'
import type { Product } from '../../../Types'
import './Home.css'
import { Link } from 'react-router'

export default function Home({ productsData, }: { productsData: Product[] | null }) {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-overlay">
                    <h1>Welcome to Temporary Products</h1>

                    <p>
                        Your trusted partner in finding the perfect
                        product in Missouri.
                    </p>
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
                                <h3>Click Here To See More Products!</h3>

                                <p>
                                    Browse all available rentals and find the
                                    perfect place for your next home.
                                </p>
                            </div>
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