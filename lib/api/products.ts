import {
   ProductDTO,
   PaginatedProducts,
   CreateProductDTO,
   UpdateProductDTO,
} from "@/types/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(
   page = 1,
   limit = 10,
   search = "",
   fromDate: Date | null = null,
   toDate: Date | null = null,
   accessToken: string | null
): Promise<PaginatedProducts> {
   const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
   });
   // console.log("Request Query:", query.toString());

   const res = await fetch(
      `${API_URL}/admin/productManagement/list/?${query.toString()}`,
      {
         headers: { Authorization: `Bearer ${accessToken}` },
         credentials: "include",
      }
   );

   if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch products");
   }

   return res.json();
}

export async function createProduct(
   data: CreateProductDTO,
   accessToken: string | null
) {
   try {
      const res = await fetch(`${API_URL}/admin/productManagement/create`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
         },
         body: JSON.stringify(data),
         credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
         throw new Error(result?.message || "Failed to create product");
      }

      return result;
   } catch (error: any) {
      console.error("API Error [createProduct]:", error);
      throw error;
   }
}

export async function getProductById(
   id: string,
   accessToken: string | null
): Promise<ProductDTO> {
   const res = await fetch(`${API_URL}/admin/productManagement/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch product");
   }

   return result;
}

export async function updateProduct(
   id: string,
   data: UpdateProductDTO,
   accessToken: string | null
) {
   const res = await fetch(`${API_URL}/admin/productManagement/${id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to update product");
   }
   return result;
}

export async function deleteProduct(id: string, accessToken: string | null) {
   const res = await fetch(`${API_URL}/admin/productManagement/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to delete product");
   }

   return result;
}
