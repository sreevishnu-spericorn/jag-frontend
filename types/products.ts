// types/products.ts

export interface ProductDTO {
   id: string;
   productName: string;
   createdAt: string;
   updatedAt: string;
   approved?: boolean;
   isDeleted?: boolean;
}

export interface PaginatedProducts {
   products: ProductDTO[];
   message: string;
   statusCode: number;
   pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
   };
   success?: boolean;
}

export interface CreateProductDTO {
   productName: string;
}

export interface UpdateProductDTO {
   productName?: string;
   status?: boolean;
}
