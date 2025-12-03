import React from 'react';
import { Product } from '../../../src/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  savedIds: number[];
  onSaveToggle: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  savedIds,
  onSaveToggle
}) => {
  return (
    <section>
      <div className="products-header">
        <h2>Products</h2>
        <span className="badge">Mock Woolworths &amp; bakery range</span>
      </div>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isSaved={savedIds.includes(p.id)}
            onSaveToggle={onSaveToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
