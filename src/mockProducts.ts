import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Abbott's Bakery Rustic White Bread Sandwich Slice Loaf",
    size: '700g',
    price: 5.2,
    category: 'Bakery',
    priceHistory: [
      { date: '2025-10-14', price: 5.2 },
      { date: '2025-10-21', price: 5.2 },
      { date: '2025-11-10', price: 5.2 },
      { date: '2025-11-12', price: 5.2 },
      { date: '2025-11-26', price: 5.8 }
    ]
  },
  {
    id: 2,
    name: "Abbott's Bakery Country Grains Sandwich Slice Bread Loaf",
    size: '800g',
    price: 5.2,
    category: 'Bakery'
  },
  // ...rest unchanged


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
