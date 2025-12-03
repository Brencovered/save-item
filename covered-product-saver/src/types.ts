export interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface SavedProduct extends Product {
  savedAt: string;
}
