import {
   ClientDTO,
   PaginatedClients,
   CreateClientDTO,
   UpdateClientDTO,
} from "@/types/clients";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getClientById(
   id: string,
   accessToken: string
): Promise<ClientDTO> {
   const res = await fetch(`${API_URL}/admin/clientManagement/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch client");
   }

   return result;
}

export async function deleteClient(id: string, accessToken: string) {
   const res = await fetch(`${API_URL}/admin/clientManagement/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to delete client");
   }

   return result;
}

export async function fetchClients(
   accessToken: string,
   page = 1,
   limit = 10,
   search = "",
   fromDate: Date | null = null,
   toDate: Date | null = null
): Promise<PaginatedClients> {
   const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
   });

   const res = await fetch(
      `${API_URL}/admin/clientManagement/list/?${query.toString()}`,
      {
         headers: { Authorization: `Bearer ${accessToken}` },
         credentials: "include",
      }
   );

   if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch clients");
   }

   return res.json();
}

export async function createClient(data: CreateClientDTO, accessToken: string) {
   try {
      const formData = new FormData();
      formData.append("accountName", data.accountName);
      formData.append("contactName", data.contactName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("sendWelcome", data.welcomeEmail ? "true" : "false");

      if (data.logo) {
         formData.append("logo", data.logo);
      }

      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/admin/clientManagement/create`,
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
            credentials: "include",
         }
      );

      const result = await res.json();

      if (!res.ok) {
         throw new Error(result?.message || "Failed to create client");
      }

      return result;
   } catch (error: any) {
      console.error("API Error [createClient]:", error);
      throw error;
   }
}

export async function updateClient(
   id: string,
   accessToken: string,
   data: UpdateClientDTO
) {
   const formData = new FormData();

   if (data.accountName) formData.append("accountName", data.accountName);
   if (data.contactName) formData.append("contactName", data.contactName);
   if (data.phone) formData.append("phone", data.phone);
   if (data.email) formData.append("email", data.email);
   if (data.welcomeEmail !== undefined) {
      formData.append("welcomeEmail", data.welcomeEmail ? "true" : "false");
   }

   if (data.logo) {
      formData.append("logo", data.logo);
   }

   const res = await fetch(`${API_URL}/admin/clientManagement/${id}`, {
      method: "PUT",
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      credentials: "include",
   });

   const result = await res.json();
   if (!res.ok) throw new Error(result.message || "Failed to update");
   return result;
}
