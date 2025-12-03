// src/mockProducts.ts
import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Abbott's Bakery Rustic White Bread Sandwich Slice Loaf",
    size: '700g',
    category: 'Bakery',
    price: 5.2,
    priceHistory: [
      { date: '2025-10-01', price: 5.2 },
      { date: '2025-10-08', price: 5.2 },
      { date: '2025-10-15', price: 4.9 },
      { date: '2025-10-22', price: 4.9 },
      { date: '2025-10-29', price: 5.2 },
      { date: '2025-11-05', price: 5.2 },
      { date: '2025-11-12', price: 5.5 },
      { date: '2025-11-19', price: 5.5 },
      { date: '2025-11-26', price: 5.2 },
      { date: '2025-12-03', price: 5.2 }
    ]
  },
  {
    id: 2,
    name: "Abbott's Bakery Country Grains Sandwich Slice Bread Loaf",
    size: '800g',
    category: 'Bakery',
    price: 5.5,
    priceHistory: [
      { date: '2025-10-01', price: 5.0 },
      { date: '2025-10-08', price: 5.0 },
      { date: '2025-10-15', price: 5.2 },
      { date: '2025-10-22', price: 5.2 },
      { date: '2025-10-29', price: 4.9 },
      { date: '2025-11-05', price: 4.9 },
      { date: '2025-11-12', price: 5.2 },
      { date: '2025-11-19', price: 5.2 },
      { date: '2025-11-26', price: 5.5 },
      { date: '2025-12-03', price: 5.5 }
    ]
  },
  {
    id: 3,
    name: 'Farmers Union Greek Style Yoghurt Mango Pouch',
    size: '130g',
    category: 'Dairy',
    price: 1.7
  },
  {
    id: 4,
    name: 'Mount Franklin Lightly Sparkling Lime 10x375ml',
    size: '10 x 375ml',
    category: 'Drinks',
    price: 10.0
  }
];
