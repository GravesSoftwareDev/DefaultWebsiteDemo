import { useParams, Link } from 'react-router';
import type { Product } from '../../../Types.tsx';
import './Product.css';

export default function ProductPage({ productsData }: { productsData: Product[] | null }) {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);

    if (productsData === null) {
        return (
            <div className="product-wrapper">
                <div className="product-state-box">
                    <div className="product-spinner" />
                    <p className="product-state-text">Loading product…</p>
                </div>
            </div>
        );
    }

    const product = productsData.find((p) => p.id === productId);

    if (!product) {
        return (
            <div className="product-wrapper">
                <div className="product-state-box">
                    <span className="product-not-found-code">404</span>
                    <p className="product-state-text">Product not found.</p>
                    <Link to="/Customer" className="product-back-link">← Back to catalogue</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-wrapper">
            <nav className="product-breadcrumb">
                <Link to="/Customer" className="product-breadcrumb-link">Catalogue</Link>
                <span className="product-breadcrumb-sep">/</span>
                <span className="product-breadcrumb-current">{product.title}</span>
            </nav>

            <div className="product-card">
                <div className="product-image-panel">
                    {product.hero_image ? (
                        <img
                            src={product.hero_image}
                            alt={product.title}
                            className="product-image"
                        />
                    ) : (
                        <div className="product-image-placeholder">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                                <rect x="8" y="8" width="48" height="48" rx="4" stroke="var(--border)" strokeWidth="2" fill="none" />
                                <circle cx="24" cy="24" r="6" stroke="var(--border)" strokeWidth="2" fill="none" />
                                <path d="M8 44 L22 30 L32 40 L42 28 L56 44" stroke="var(--border)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                            </svg>
                            <span className="product-image-placeholder-text">No image available</span>
                        </div>
                    )}
                    <div className="product-id-badge">#{product.id}</div>
                </div>

                <div className="product-content-panel">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-divider" />
                    <h2 className="product-section-label">Description</h2>
                    <p className="product-description">{product.description}</p>
                    <div className="product-actions">
                        <button className="product-primary-button">Add to Cart</button>
                        <Link to="/Customer" className="product-secondary-button">← Back to Catalogue</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}