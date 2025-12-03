import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  savedIds: number[];
  quantities: Record<number, number>;
  onSaveToggle: (product: Product) => void;
  onQuantityChange: (product: Product, delta: number) => void;
  onShowHistory: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  savedIds,
  quantities,
  onSaveToggle,
  onQuantityChange,
  onShowHistory
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
            quantity={quantities[p.id] ?? 0}
            onQuantityChange={(delta) => onQuantityChange(p, delta)}
            onSaveToggle={onSaveToggle}
            onShowHistory={onShowHistory}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
