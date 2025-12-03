export interface PricePoint {
  date: string;      // ISO formatted date
  price: number;
}

export interface Product {
  id: number;
  name: string;
  size: string;
  category?: string;
  price: number;
  woolworthsPrice?: number;
  colesPrice?: number;
  was_price?: number;
  image_url?: string;
  special_tier?: 'half_price' | 'big_discount' | 'none';
  priceHistory?: PricePoint[];   // <-- important for predictions
}

export interface SavedProduct extends Product {
  savedAt: string;   // ISO string
}
