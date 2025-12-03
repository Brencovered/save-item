export interface PricePoint {
  date: string;   // ISO string
  price: number;
}

export interface SavedProduct {
  id: number;
  name: string;
  size: string;
  price: number;
  savedAt: string; // ISO string
  priceHistory?: PricePoint[];
}
