export interface Product {
   id: string;
   name: string;
   price: number;
   description: string;
   imageUrl: string;
   categoryId: string;
}

export interface Group {
   id: string;
   name: string;
   imageUrl: string | null;
   products: Product[];
}
