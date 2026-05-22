import { useMemo, useState } from 'react';
import numeral from 'numeral';
import type { Product } from '../../../Types.tsx';
import ProductCard from '../../../Components/ProductCard/ProductCard.tsx';
import './Products.css';

type SortOption = 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'newest';

export default function Products({ productsData }: { productsData: Product[] | null }) {
    const [sortOption, setSortOption] = useState<SortOption>('title-asc');

    const hasProducts = productsData && productsData.length > 0;

    const getPrice = (price: string) => numeral(price).value() ?? 0;

    const sortedProducts = useMemo(() => {
        if (!productsData) return [];

        return [...productsData].sort((a, b) => {
            switch (sortOption) {
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'price-asc':
                    return getPrice(a.price) - getPrice(b.price);
                case 'price-desc':
                    return getPrice(b.price) - getPrice(a.price);
                case 'newest':
                    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
                default:
                    return 0;
            }
        });
    }, [productsData, sortOption]);

    return (
        <div className="products-page">
            <div className="products-header">
                <div>
                    <h1>Products</h1>
                    {hasProducts && (
                        <span className="products-count">{productsData.length} items</span>
                    )}
                </div>

                {hasProducts && (
                    <div className="products-sort-wrapper">
                        <label htmlFor="products-sort">Sort by</label>
                        <select
                            id="products-sort"
                            className="products-sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                        >
                            <option value="title-asc">Title: A-Z</option>
                            <option value="title-desc">Title: Z-A</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
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
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}