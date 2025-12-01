import { AdminProfileDTO, UpdateProfileDTO } from "@/types/profile";
import { getProfileBasePath } from "@/utils/basePath";
import { decodeAccessToken } from "@/utils/decodeToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProfile(
   accessToken: string | null
): Promise<AdminProfileDTO> {
   const decoded = decodeAccessToken(accessToken);
   const role = decoded?.roleId;

   const basePath = getProfileBasePath(role);

   const res = await fetch(`${API_URL}${basePath}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` || "" },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch profile");
   }

   return result;
}

export async function updateProfile(
   data: UpdateProfileDTO,
   accessToken: string | null
): Promise<AdminProfileDTO> {
   console.log(data);

   const decoded = decodeAccessToken(accessToken);
   const role = decoded?.roleId;

   const basePath = getProfileBasePath(role);
   try {
      const res = await fetch(`${API_URL}${basePath}/update`, {
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
   const decoded = decodeAccessToken(accessToken);
   const role = decoded?.roleId;

   const basePath = getProfileBasePath(role);

   const res = await fetch(
      `${API_URL}${basePath}/change-password`,
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
