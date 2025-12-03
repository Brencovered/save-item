// src/components/ProductGrid.tsx
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  savedIds: number[];
  quantities: Record<number, number>;
  onSaveToggle: (p: Product) => void;
  onQuantityChange: (p: Product, delta: number) => void;
  onShowHistory: (p: Product) => void;
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
        <span className="badge">Mock Woolworths & bakery range</span>
      </div>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isSaved={savedIds.includes(p.id)}
            quantity={quantities[p.id] ?? 0}
            onSaveToggle={onSaveToggle}
            onQuantityChange={onQuantityChange}
            onShowHistory={onShowHistory}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
