export interface PaymentDTO {
   id: string;
   proposalId: string;
   stripePaymentId: string;
   amount: number;
   currency: string;
   status: string;
   paymentMethod?: string;
   createdAt: string;
   updatedAt: string;
   proposal?: any;
}

export interface PaginatedPayments {
   payments: PaymentDTO[];
   pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
   };
}
