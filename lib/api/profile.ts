import { AdminProfileDTO, UpdateProfileDTO } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProfile(
   accessToken: string | null
): Promise<AdminProfileDTO> {
   const res = await fetch(`${API_URL}/admin/profileManagement/me`, {
      headers: { Authorization: `Bearer ${accessToken}` || "" },
      credentials: "include",
   });

   const result = await res.json();

   console.log(result);

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch profile");
   }

   return result;
}

export async function updateProfile(
   data: UpdateProfileDTO,
   accessToken: string | null
): Promise<AdminProfileDTO> {
   try {
      const res = await fetch(`${API_URL}/admin/profileManagement/update`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}` || "",
         },
         body: JSON.stringify(data),
         credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
         throw new Error(result?.message || "Failed to update profile");
      }

      return result;
   } catch (error: any) {
      console.error("API Error [updateProfile]:", error);
      throw error;
   }
}

export async function changePassword(
   data: { currentPassword: string; newPassword: string },
   accessToken: string | null
) {
   const res = await fetch(
      `${API_URL}/admin/profileManagement/change-password`,
      {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}` || "",
         },
         credentials: "include",
         body: JSON.stringify(data),
      }
   );

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to change password");
   }

   return result;
}
