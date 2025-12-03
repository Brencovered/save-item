import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onSaveToggle: (product: Product) => void;
  quantity: number;
  onQuantityChange: (delta: number) => void;
  onShowHistory: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onSaveToggle,
  quantity,
  onQuantityChange,
  onShowHistory
}) => {
  const handleMinus = () => {
    if (quantity <= 0) return;
    onQuantityChange(-1);
  };

  const handlePlus = () => {
    onQuantityChange(1);
  };

  const hasHistory = !!product.priceHistory && product.priceHistory.length > 0;

  return (
    <div className="card">
      {/* tiny price history icon in top-right */}
      {hasHistory && (
        <button
          className="price-history-icon"
          type="button"
          onClick={() => onShowHistory(product)}
          aria-label="Show price history"
        >
          {/* simple little sparkline icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
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
        )}
      </div>

      <div className="card-name">{product.name}</div>
      <div className="card-size">{product.size}</div>

      {/* price + save row */}
      <div className="card-footer">
        <div>
          <div className="card-price">${product.price.toFixed(2)}</div>
          <div className="card-category">{product.category}</div>
        </div>

        <button
          className={'save-button ' + (isSaved ? 'saved' : '')}
          onClick={() => onSaveToggle(product)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* bottom quantity bar */}
      <div className="card-qty-row">
        <button
          className="qty-btn qty-minus"
          onClick={handleMinus}
          disabled={quantity <= 0}
        >
          –
        </button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn qty-plus" onClick={handlePlus}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
