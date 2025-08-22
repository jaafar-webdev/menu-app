export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  [key: string]: any;
}

export interface Group {
  id: string;
  name: string;
  image_url: string | null;
  products: Product[];
}
