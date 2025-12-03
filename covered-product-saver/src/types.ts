// src/types.ts

export interface PricePoint {
  date: string;  // ISO date string: "2025-12-03"
  price: number; // price on that date
}

export interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  category: string;
  imageUrl?: string;
  priceHistory?: PricePoint[]; // <-- now strongly typed
}

export interface SavedProduct extends Product {
  savedAt: string; // ISO date string for when the user saved it
}
