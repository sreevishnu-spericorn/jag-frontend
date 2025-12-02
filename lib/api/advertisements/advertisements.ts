const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createAdvertisementAPI(
   formData: FormData,
   accessToken: string
) {
   const res = await fetch(`${API_URL}/client/advertisementManagement/create`, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to create advertisement");
   }

   return result;
}

export async function getClientAdvertisements(
   accessToken: string,
   params: { page?: number; limit?: number } = {}
) {
   const query = new URLSearchParams();

   if (params.page) query.append("page", params.page.toString());
   if (params.limit) query.append("limit", params.limit.toString());

   const res = await fetch(
      `${API_URL}/client/advertisementManagement/list?${query.toString()}`,
      {
         method: "GET",
         headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
         },
         credentials: "include",
      }
   );

   const result = await res.json();
   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch advertisements");
   }

   return result;
}

export async function getClientAdvertisementByIdAPI(
   id: string,
   accessToken: string
) {
   const res = await fetch(`${API_URL}/client/advertisementManagement/${id}`, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch advertisement");
   }

   return result;
}
