import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Abbott's Bakery Rustic White Bread Sandwich Slice Loaf",
    size: '700g',
    price: 5.2,               // current price
    category: 'Bakery',
    priceHistory: [
      // roughly 2 months of weekly prices
      { date: '2025-10-01', price: 5.20 },
      { date: '2025-10-08', price: 5.20 },
      { date: '2025-10-15', price: 4.90 }, // on special
      { date: '2025-10-22', price: 4.90 },
      { date: '2025-10-29', price: 5.20 }, // back to normal
      { date: '2025-11-05', price: 5.20 },
      { date: '2025-11-12', price: 5.50 }, // slight rise
      { date: '2025-11-19', price: 5.50 },
      { date: '2025-11-26', price: 5.20 }, // down again
      { date: '2025-12-03', price: 5.20 }  // “this week”
    ]
  },
  {
    id: 2,
    name: "Abbott's Bakery Country Grains Sandwich Slice Bread Loaf",
    size: '800g',
    price: 5.2,
    category: 'Bakery',
    priceHistory: [
      { date: '2025-10-01', price: 5.00 },
      { date: '2025-10-08', price: 5.00 },
      { date: '2025-10-15', price: 5.20 },
      { date: '2025-10-22', price: 5.20 },
      { date: '2025-10-29', price: 4.90 },
      { date: '2025-11-05', price: 4.90 },
      { date: '2025-11-12', price: 5.20 },
      { date: '2025-11-19', price: 5.20 },
      { date: '2025-11-26', price: 5.50 },
      { date: '2025-12-03', price: 5.50 }
    ]
  },
  // ...rest of your mock products unchanged


  {
    id: 3,
    name: "Abbott's Bakery Dark Rye Bread Sandwich Slice Loaf",
    size: '700g',
    price: 5.2,
    category: 'Bakery'
  },
  {
    id: 4,
    name: "Abbott's Bakery Farmhouse Wholemeal Bread Sandwich Slice Loaf",
    size: '750g',
    price: 5.2,
    category: 'Bakery'
  },
  {
    id: 5,
    name: "Abbott's Bakery Gluten Free Farmhouse White Bread Slice Loaf",
    size: '500g',
    price: 7.9,
    category: 'Bakery'
  },
  {
    id: 6,
    name: "Abbott's Bakery Harvest Seeds & Grains Sandwich Slice Bread Loaf",
    size: '750g',
    price: 5.2,
    category: 'Bakery'
  },
  {
    id: 7,
    name: "Abbott's Bakery Light Rye Bread Sandwich Slice Loaf",
    size: '680g',
    price: 5.2,
    category: 'Bakery'
  },
  {
    id: 8,
    name: "Abbott's Bakery Smooth Oat Bread Sandwich Slice Loaf",
    size: '700g',
    price: 5.2,
    category: 'Bakery'
  },
  {
    id: 9,
    name: "Abbott's Bakery Sourdough Rye Bread Sandwich Slice Loaf",
    size: '760g',
    price: 4.9,
    category: 'Bakery'
  },
  {
    id: 10,
    name: '35hr Whole Soybean & Linseed Sourdough Loaf',
    size: 'each',
    price: 7.0,
    category: 'Bakery'
  }
];
