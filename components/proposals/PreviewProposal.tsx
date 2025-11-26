"use client";

import { useState } from "react";
import { ProposalDetailDTO } from "@/types/proposals";
import { ProposalPaymentFormWrapper } from "./ProposalPaymentForm";

interface Props {
   proposal: ProposalDetailDTO;
   onClose: () => void;
}

export default function PreviewProposal({ proposal, onClose }: Props) {
   const totalAmount = proposal.products.reduce((acc, p) => acc + p.total, 0);
   const [showPayment, setShowPayment] = useState(false);

   if (showPayment) {
      return (
         <ProposalPaymentFormWrapper
            amount={totalAmount}
            proposalId={proposal.id}
            onBack={() => setShowPayment(false)}
         />
      );
   }

   return (
      <div className="w-full mx-auto p-10 bg-white rounded-3xl">
         {/* HEADER */}
         <div className="flex justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
               Pay Now
            </h2>
         </div>

         {/* PROPOSAL INFO CARD */}
         <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
               Proposal Details
            </h3>

            <div className="grid grid-cols-5 gap-4 text-sm">
               <Info label="Proposal ID" value={proposal.id} />
               <Info label="Proposal Name" value={proposal.proposalName} />
               <Info label="Client Name" value={proposal.client.accountName} />
               <Info
                  label="Created On"
                  value={new Date(proposal.createdAt).toLocaleDateString(
                     "en-US"
                  )}
               />
               <Info
                  label="Last Updated"
                  value={new Date(proposal.updatedAt).toLocaleDateString(
                     "en-US"
                  )}
               />
            </div>
         </div>

         {/* PRODUCTS TABLE */}
         <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-sm">
               <thead className="bg-gray-50 text-gray-700 border-b">
                  <tr className="text-left">
                     <Th>#</Th>
                     <Th>Product Name</Th>
                     <Th>Publisher</Th>
                     <Th>Budget</Th>
                     <Th>Quantity</Th>
                     <Th>Total Amount</Th>
                  </tr>
               </thead>

               <tbody>
                  {proposal.products.map((prod, index) => (
                     <tr
                        key={index}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                     >
                        <Td>{index + 1}</Td>
                        <Td>{prod.productId}</Td>
                        <Td>{prod.publisherId}</Td>
                        <Td>${prod.price.toLocaleString()}</Td>
                        <Td>{prod.quantity}</Td>
                        <Td className="font-semibold">
                           ${prod.total.toLocaleString()}
                        </Td>
                     </tr>
                  ))}
               </tbody>

               <tfoot>
                  <tr className="bg-gray-100 text-right text-gray-800 font-semibold">
                     <td colSpan={5} className="p-4">
                        Total
                     </td>
                     <td className="p-4 text-lg font-bold">
                        ${totalAmount.toLocaleString()}
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>

         {/* PAYMENT OPTION */}
         <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
               Payment Option
            </h3>

            <label className="flex items-center gap-4 cursor-pointer group">
               <div
                  className="
                     w-6 h-6 rounded-full border-2 border-gray-400
                     group-hover:border-teal-500 transition-all 
                     flex items-center justify-center
                  "
               >
                  <input
                     type="radio"
                     name="payment"
                     defaultChecked
                     className="hidden"
                  />
                  <div className="w-3 h-3 bg-teal-500 rounded-full opacity-0 group-has-checked:opacity-100 transition" />
               </div>

               <span className="text-gray-700 group-hover:text-teal-600 transition text-sm font-medium">
                  Full Payment
               </span>
            </label>
         </div>

         {/* FOOTER BUTTONS */}
         <div className="mt-12 flex justify-end gap-4">
            <button
               onClick={onClose}
               className="
                  px-8 py-2 rounded-full border border-gray-300 
                  text-gray-700 font-medium
                  bg-white hover:bg-gray-100 transition
               "
            >
               Cancel
            </button>
            <button
               onClick={() => setShowPayment(true)}
               disabled={proposal.paymentStatus !== "Unpaid"}
               className={`
    px-12 py-2 rounded-full font-semibold transition shadow-md
    ${
       proposal.paymentStatus === "Unpaid"
          ? "bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
            >
               Next
            </button>
         </div>
      </div>
   );
}

function Info({ label, value }: { label: string; value: string }) {
   return (
      <div className="flex flex-col">
         <span className="text-xs text-gray-500">{label}</span>
         <span className="font-medium text-gray-800">{value}</span>
      </div>
   );
}

const Th = ({ children }: any) => (
   <th className="p-4 font-semibold text-gray-700">{children}</th>
);

const Td = ({ children }: any) => (
   <td className="p-4 text-gray-800">{children}</td>
);
