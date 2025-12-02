// lib/api/campaigns/campaigns.ts

import { CampaignListItemDTO, CampaignListResponse } from "@/types/campaigns";
import { decodeAccessToken } from "@/utils/decodeToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches a list of campaigns (client route is implied for paid proposals/active campaigns)
 * @param accessToken User's access token
 * @param page Current page number
 * @param limit Items per page
 * @param search Search query
 * @param fromDate Start date filter
 * @param toDate End date filter
 * @returns PaginatedCampaigns data
 */
export async function fetchCampaigns(
   accessToken: string | null,
   page = 1,
   limit = 10,
   search = "",
   fromDate: Date | null = null,
   toDate: Date | null = null
): Promise<CampaignListResponse> {
   const decoded = decodeAccessToken(accessToken);
   const role = decoded?.roleId;

   // Use /client/campaignManagement as this is a client route for active campaigns (paid proposals)
   const basePath = "/client/campaignManagement";

   const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
   });

   const res = await fetch(`${API_URL}${basePath}/list?${query.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch campaigns");
   }

   return res.json();
}

/**
 * Fetches a single campaign by ID
 * @param id Campaign ID
 * @param accessToken User's access token
 * @returns CampaignDetailDTO data
 */
export async function getCampaignById(
   id: string,
   accessToken: string | null
): Promise<CampaignListItemDTO> {
   const basePath = "/client/campaignManagement";

   const res = await fetch(`${API_URL}${basePath}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch campaign");
   }

   return result;
}

// NOTE: Since the requirement is just to show data, delete/edit functions are omitted for now.
