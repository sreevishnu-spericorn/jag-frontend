import { useAuth } from "@/contexts/AuthContext";
import { PublisherDTO, PaginatedPublishers } from "@/types/publishers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreatePublisherDTO {
   publisherName: string;
   email: string;
   phoneNo?: string;
   whatsappNo?: string;
   logo?: File;
   w9Files?: File[];
   description?: string;
   products?: { productId: string; price: number }[];
}

export interface UpdatePublisherDTO {
   publisherName?: string;
   email?: string;
   phoneNo?: string;
   whatsappNo?: string;
   logo?: string | File | null;
   w9Files?: (string | File)[];
   description?: string;
   removedW9Files: (string | File)[];
   products?: { productId: string; price: number }[];
}

export async function fetchPublishers(
   page = 1,
   limit = 10,
   search = "",
   accessToken: string | null,
   fromDate: Date | null = null,
   toDate: Date | null = null
): Promise<PaginatedPublishers> {
   const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
   });

   const res = await fetch(
      `${API_URL}/admin/publisherManagement/list?${query.toString()}`,
      {
         headers: { Authorization: `Bearer ${accessToken}` },
         credentials: "include",
      }
   );

   if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch publishers");
   }

   return res.json();
}

export async function getPublisherById(id: string): Promise<PublisherDTO> {
   const { accessToken } = useAuth();
   const res = await fetch(`${API_URL}/admin/publisherManagement/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });
   const result = await res.json();
   if (!res.ok) throw new Error(result?.message || "Failed to fetch publisher");
   return result;
}

export async function deletePublisher(id: string) {
   const { accessToken } = useAuth();
   const res = await fetch(`${API_URL}/admin/publisherManagement/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });
   const result = await res.json();
   if (!res.ok)
      throw new Error(result?.message || "Failed to delete publisher");
   return result;
}

export async function createPublisher(
   data: CreatePublisherDTO,
   accessToken: string | null
) {
   const formData = new FormData();
   formData.append("publisherName", data.publisherName);
   formData.append("email", data.email);
   if (data.phoneNo) formData.append("phoneNo", data.phoneNo);
   if (data.whatsappNo) formData.append("whatsappNo", data.whatsappNo);
   if (data.description) formData.append("description", data.description);
   if (data.logo) formData.append("logo", data.logo);
   if (data.w9Files)
      data.w9Files.forEach((file) => formData.append("w9Files", file));

   formData.append("products", JSON.stringify(data.products));

   const res = await fetch(`${API_URL}/admin/publisherManagement/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
      credentials: "include",
   });
   const result = await res.json();
   if (!res.ok)
      throw new Error(result?.message || "Failed to create publisher");
   return result;
}

export async function updatePublisher(
   id: string,
   data: UpdatePublisherDTO,
   accessToken: string | null
) {
   const formData = new FormData();
   if (data.publisherName) formData.append("publisherName", data.publisherName);
   if (data.email) formData.append("email", data.email);
   if (data.phoneNo) formData.append("phoneNo", data.phoneNo);
   if (data.whatsappNo) formData.append("whatsappNo", data.whatsappNo);
   if (data.description) formData.append("description", data.description);
   if (data.logo) formData.append("logo", data.logo as string | Blob);
   if (data.w9Files)
      data.w9Files.forEach((file) =>
         formData.append("w9Files", file as string | Blob)
      );
   if (data.removedW9Files) {
      formData.append("removedW9Files", JSON.stringify(data.removedW9Files));
   }
   if (data.products) {
      formData.append("products", JSON.stringify(data.products));
   }

   const res = await fetch(`${API_URL}/admin/publisherManagement/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
      credentials: "include",
   });
   const result = await res.json();
   if (!res.ok)
      throw new Error(result?.message || "Failed to update publisher");
   return result;
}
