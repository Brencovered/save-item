import React from 'react';
import { Product } from '../../../src/types';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onSaveToggle: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onSaveToggle
}) => {
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

      <div className="card-footer">
        <div>
          <div className="card-price">${product.price.toFixed(2)}</div>
          <div className="card-category">{product.category}</div>
        </div>
        <button
          className={
            'save-button ' + (isSaved ? 'saved' : '')
          }
          onClick={() => onSaveToggle(product)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
