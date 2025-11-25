import { ProductDTO } from "./products";

export interface PublisherDTO {
   id: string;
   publisherName: string;
   email: string;
   phoneNo?: string;
   whatsappNo?: string;
   logo?: string;
   w9Files?: string[];
   description?: string;
   products?: PublisherProductDTO[];
   createdAt: string;
   updatedAt: string;
}
export interface PaginatedPublishers {
   publishers: PublisherDTO[];
   total: number;
   page: number;
   limit: number;
   pagination: { pages: number };
}

export interface PublisherProductDTO {
   id: string;
   product: ProductDTO;
   productId: string;
   price: number;
   publisherId: string;
}
