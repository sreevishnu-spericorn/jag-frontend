// frontend/lib/api/payment.ts
import { PaymentDTO, PaginatedPayments } from "@/types/payment";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createPaymentIntent(
   proposalId: string,
   accessToken: string | null
): Promise<{ clientSecret: string }> {
   const res = await fetch(
      `${API_URL}/admin/proposalManagement/payment/create-payment-intent`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
         },
         credentials: "include",
         body: JSON.stringify({ proposalId }),
      }
   );

   const result = await res.json();
   if (!res.ok) {
      throw new Error(result?.message || "Failed to create payment intent");
   }

   if (result.data?.clientSecret)
      return { clientSecret: result.data.clientSecret };
   if (result.clientSecret) return { clientSecret: result.clientSecret };
   throw new Error("clientSecret not returned by server");
}

export async function fetchPayments(
   accessToken: string | null,
   page = 1,
   limit = 10,
   proposalId: string | null = null,
   fromDate: Date | null = null,
   toDate: Date | null = null
): Promise<PaginatedPayments> {
   const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      proposalId: proposalId || "",
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
   });

   const res = await fetch(
      `${API_URL}/admin/paymentManagement/list?${query.toString()}`,
      {
         headers: { Authorization: `Bearer ${accessToken}` },
         credentials: "include",
      }
   );

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch payments");
   }

   return result.data || result;
}

export async function getPaymentById(
   id: string,
   accessToken: string
): Promise<PaymentDTO> {
   const res = await fetch(`${API_URL}/admin/paymentManagement/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const result = await res.json();

   if (!res.ok) {
      throw new Error(result?.message || "Failed to fetch payment");
   }

   return result.data || result;
}
