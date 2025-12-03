export interface PricePoint {
  date: string;   // ISO date string e.g. "2025-11-26"
  price: number;  // price on that date
}

export interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  category: string;
  imageUrl?: string;
  priceHistory?: PricePoint[];
}

export interface SavedProduct extends Product {
  savedAt: string;
}
