import type { Product } from '../../Types'
import { Link } from 'react-router'
import './ProductCard.css'

export default function ProductCard({
    product,
}: {
    product: Product
}) {
    return (
        <div className="product-cards">
            <div className="product-cards-image">
                {product.hero_image ? (
                    <img
                        src={product.hero_image}
                        alt={product.title}
                    />
                ) : (
                    <div className="product-cards-placeholder">
                        No Image Available
                    </div>
                )}
            </div>

            <div className="product-cards-content">
                <h2>{product.title}</h2>

                <p>{product.description}</p>
                <Link to={`/Customer/product/${product.id}`} className="details-link">
                    <button>
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    )
}