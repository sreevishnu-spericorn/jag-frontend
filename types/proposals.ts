// types/proposals.ts

import { Pagination } from "./clients"; // Assuming Pagination is in types/clients.ts

// --- API Response Types ---

export interface ProposalProductDTO {
   id: string; // ProposalProduct unique ID
   proposalId: string;
   publisherId: string;
   productId: string;
   quantity: number;
   price: number;
   total: number;
}

export interface ProposalListItemDTO {
   id: string;
   clientId: string;
   proposalName: string;
   proposalStatus: "Pending" | "Approved" | "Rejected" | "Sent" | "Paid";
   paymentStatus: "Unpaid" | "Paid" | "Canceled";
   proposalEmail: string;
   totalAmount: number;
   createdAt: string;
   updatedAt: string;
   isDeleted: boolean;
   // Included from the backend list query
   client: {
      email: string;
      accountName: string;
      id: string;
      logo?: string; // Add logo from client model for table display
      phone?: string; // Add phone from client model for table display
   };
   // Note: products are NOT included in the list DTO for performance,
   // but we will fetch them separately to calculate the total on the client.
}

export interface PaginatedProposals {
   proposals: ProposalListItemDTO[];
   pagination: Pagination;
   success: boolean;
   message: string;
   statusCode: number;
}

// --- Detail/Form Types ---

export interface ProposalDetailDTO extends ProposalListItemDTO {
   products: ProposalProductDTO[];
   // Full product details are usually nested here for the detail page
}

export interface CreateProposalDTO {
   clientId: string;
   proposalName: string;
   proposalEmail: string;
   totalAmount: number;
   products: ProposalProductDTO[]; // Use the simpler DTO for creation
}

export interface UpdateProposalDTO {
   clientId?: string;
   proposalName?: string;
   proposalEmail?: string;
   proposalStatus?: "Pending" | "Approved" | "Rejected" | "Sent" | "Paid";
   paymentStatus?: "Unpaid" | "Paid" | "Canceled";
   totalAmount?: number;
   products?: ProposalProductDTO[];
}
