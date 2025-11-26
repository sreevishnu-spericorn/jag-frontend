"use client";

import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
   Elements,
   useStripe,
   useElements,
   PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "../common/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createPaymentIntent } from "@/lib/api/payment";
import { FiX, FiLock } from "react-icons/fi";

const stripePromise = loadStripe(
   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface ProposalPaymentFormProps {
   amount: number;
   proposalId: string;
   onBack: () => void;
}

function PaymentFormContent({ amount, onBack }: ProposalPaymentFormProps) {
   const stripe = useStripe();
   const elements = useElements();
   const [loading, setLoading] = useState(false);

   const handlePay = async () => {
      if (!stripe || !elements) return;

      setLoading(true);

      await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
         },
         redirect: "always",
      });

      setLoading(false);
   };

   return (
      <div className="w-full p-8 bg-white rounded-[20px] shadow-2xl relative">
         <div className="absolute top-4 right-4">
            <FiX
               size={24}
               className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
               onClick={onBack}
            />
         </div>

         <div className="mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-800">
               Confirm Payment
            </h2>
            <p className="text-sm text-gray-500 mt-1">
               Securely complete your proposal payment.
            </p>
         </div>

         <div className="flex justify-between items-center p-4 mb-8 rounded-xl bg-teal-50 border border-teal-200">
            <p className="text-base font-semibold text-teal-700">
               Total Amount Due
            </p>
            <p className="text-2xl font-bold text-teal-800">
               ${amount.toLocaleString()}
            </p>
         </div>

         <div className="p-4 rounded-xl mb-6 bg-white border border-gray-200 shadow-inner">
            <PaymentElement />
         </div>

         <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-8">
            <FiLock size={14} />
            <span className="font-medium">
               This payment is 100% secure and processed by Stripe.
            </span>
         </div>

         <div className="flex justify-center gap-6 pt-4">
            <Button
               className="px-10 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition shadow-sm"
               onClick={onBack}
               disabled={loading}
            >
               Back
            </Button>
            <Button
               className="px-10 py-3 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-600 transition shadow-lg shadow-teal-200 disabled:opacity-70"
               isLoading={loading}
               onClick={handlePay}
               disabled={!stripe}
            >
               Pay ${amount.toLocaleString()}
            </Button>
         </div>
      </div>
   );
}

export function ProposalPaymentFormWrapper(props: ProposalPaymentFormProps) {
   const { amount, proposalId, onBack } = props;
   const { accessToken } = useAuth();

   const [clientSecret, setClientSecret] = useState("");

   const hasCreatedIntent = useRef(false);

   useEffect(() => {
      if (hasCreatedIntent.current) return;
      hasCreatedIntent.current = true;

      const load = async () => {
         const res = await createPaymentIntent(proposalId, accessToken);
         setClientSecret(res.clientSecret);
      };

      load();
   }, [proposalId, accessToken]);

   if (!clientSecret) {
      return (
         <div className="w-full p-8 bg-white rounded-[20px] shadow-2xl flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500 mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">
               Preparing secure checkout...
            </p>
            <p className="text-sm text-gray-500 mt-1">
               Fetching payment details for ${amount.toLocaleString()}
            </p>
         </div>
      );
   }

   return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
         <PaymentFormContent
            amount={amount}
            proposalId={proposalId}
            onBack={onBack}
         />
      </Elements>
   );
}
