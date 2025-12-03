// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  quantity: number;
  onSaveToggle: (p: Product) => void;
  onQuantityChange: (p: Product, delta: number) => void;
  onShowHistory: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  quantity,
  onSaveToggle,
  onQuantityChange,
  onShowHistory
}) => {
  const hasHistory = !!product.priceHistory && product.priceHistory.length > 0;

  return (
    <div className="card">
      {hasHistory && (
        <button
          className="price-history-icon"
          type="button"
          onClick={() => onShowHistory(product)}
          aria-label="Show price history"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#10b981" />
            <polyline
              points="6 14 10 9 13 12 18 7"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="card-image">
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '999px',
            background:
              'radial-gradient(circle at 30% 20%, #facc15, #ef4444, #0ea5e9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '11px',
            textAlign: 'center',
            padding: '4px'
          }}
        >
          Covered
        </div>
      </div>

      <div className="card-name">{product.name}</div>
      <div className="card-size">{product.size}</div>

      <div className="card-footer">
        <div>
          <div className="card-price">${product.price.toFixed(2)}</div>
          {product.category && (
            <div className="card-category">{product.category}</div>
          )}
        </div>
        <button
          className={'save-button ' + (isSaved ? 'saved' : '')}
          onClick={() => onSaveToggle(product)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="card-qty-row">
        <button
          className="qty-btn qty-minus"
          onClick={() => onQuantityChange(product, -1)}
          disabled={quantity <= 0}
        >
          –
        </button>
        <span className="qty-value">{quantity}</span>
        <button
          className="qty-btn qty-plus"
          onClick={() => onQuantityChange(product, 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
