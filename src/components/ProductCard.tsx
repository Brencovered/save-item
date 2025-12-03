import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onSaveToggle: (product: Product) => void;
  quantity: number;
  onQuantityChange: (delta: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onSaveToggle,
  quantity,
  onQuantityChange
}) => {
  const handleMinus = () => {
    if (quantity <= 0) return;
    onQuantityChange(-1);
  };

  const handlePlus = () => {
    onQuantityChange(1);
  };

  return (
    <div className="card">
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

      {/* price + save in one row */}
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
