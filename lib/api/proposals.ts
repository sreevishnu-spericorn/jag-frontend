import {
   PaginatedProposals,
   ProposalDetailDTO,
   CreateProposalDTO,
   UpdateProposalDTO,
} from "@/types/proposals";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProposals(
   accessToken: string | null,
   page = 1,
   limit = 10,
   search = "",
   fromDate: Date | null = null,
   toDate: Date | null = null
): Promise<PaginatedProposals> {
   const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
   });
   console.log(query);

   const res = await fetch(
      `${API_URL}/admin/proposalManagement/list?${query.toString()}`,
      {
         headers: { Authorization: `Bearer ${accessToken}` },
         credentials: "include",
      }
   );

   if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch proposals");
   }

   return res.json();
}

export async function getProposalById(
   id: string,
   accessToken: string
): Promise<ProposalDetailDTO> {
   const res = await fetch(`${API_URL}/admin/proposalManagement/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();
   console.log("RAW PROPOSAL RESPONSE:", result);

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch proposal");
   }

   return result;
}

export async function createProposal(
   data: CreateProposalDTO,
   accessToken: string
) {
   const res = await fetch(`${API_URL}/admin/proposalManagement/create`, {
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
      throw new Error(result?.message || "Failed to create proposal");
   }

   return result;
}

export async function updateProposal(
   id: string,
   data: UpdateProposalDTO,
   accessToken: string
) {
   const res = await fetch(`${API_URL}/admin/proposalManagement/${id}`, {
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
      throw new Error(result?.message || "Failed to update proposal");
   }

   return result;
}

export async function deleteProposal(id: string, accessToken: string) {
   const res = await fetch(`${API_URL}/admin/proposalManagement/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to delete proposal");
   }

   return result;
}
