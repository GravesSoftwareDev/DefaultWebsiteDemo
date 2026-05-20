import type { Product } from '../../../Types.tsx';
import ProductCard from '../../../Components/ProductCard/ProductCard.tsx';
import './Products.css';

export default function Products({ productsData }: { productsData: Product[] | null }) {
    const hasProducts = productsData && productsData.length > 0;

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Products</h1>
                {hasProducts && (
                    <span className="products-count">{productsData.length} items</span>
                )}
            </div>

            {!productsData && (
                <div className="products-state">
                    <p>Loading products…</p>
                </div>
            )}

            {productsData && !hasProducts && (
                <div className="products-state">
                    <p>No products available at this time.</p>
                </div>
            )}

            {hasProducts && (
                <div className="products-grid">
                    {productsData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}