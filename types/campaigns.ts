export interface CampaignListItemDTO {
   id: string;
   quantity: number;
   price: number;
   total: number;
   createdAt: string;
   updatedAt: string;

   product: {
      id: string;
      productName: string;
      status: boolean;
      customFields: any[];
   };

   publisher: {
      id: string;
      publisherName: string;
   };

   proposal: {
      id: string;
      proposalName: string;
      createdAt: string;
      paymentStatus: string;
      proposalStatus: string;
   };

   client: {
      id: string;
      accountName: string;
      email: string;
      logo: string;
      phone: string;
   };
}

export interface CampaignListResponse {
   campaigns: CampaignListItemDTO[];
   pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
   };
   success: boolean;
   message: string;
   statusCode: number;
}
