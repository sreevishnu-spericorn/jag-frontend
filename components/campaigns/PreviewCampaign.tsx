import { CampaignListItemDTO } from "@/types/campaigns";

interface Props {
   campaign: CampaignListItemDTO; // Single proposalProduct item
   role?: string;
   onClose: () => void;
}

export default function PreviewCampaign({ campaign, onClose }: Props) {
   // For a single proposalProduct, the "items" array is just itself
   const items = [
      {
         productName: campaign.product.productName,
         publisherName: campaign.publisher.publisherName,
         creditBalance: campaign.quantity,
      },
   ];

   const totalCreditBalance = items.reduce(
      (acc, item) => acc + item.creditBalance,
      0
   );

   return (
      <div className="w-full mx-auto p-10 bg-white rounded-3xl">
         <div className="flex justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
               Campaign Details
            </h2>
         </div>

         {/* CAMPAIGN INFO CARD */}
         <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
               Campaign Information
            </h3>

            <div className="grid grid-cols-5 gap-4 text-sm">
               <Info label="Campaign ID" value={campaign.id} />
               <Info
                  label="Campaign Name"
                  value={campaign.proposal.proposalName}
               />
               <Info label="Client Name" value={campaign.client.accountName} />
               <Info
                  label="Created On"
                  value={new Date(campaign.createdAt).toLocaleDateString(
                     "en-US"
                  )}
               />
               <Info
                  label="Last Updated"
                  value={new Date(campaign.updatedAt).toLocaleDateString(
                     "en-US"
                  )}
               />
            </div>
         </div>

         {/* ITEMS TABLE */}
         <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-sm">
               <thead className="bg-gray-50 text-gray-700 border-b">
                  <tr className="text-left">
                     <Th>#</Th>
                     <Th>Product Name</Th>
                     <Th>Publisher</Th>
                     <Th>Credit Balance</Th>
                  </tr>
               </thead>

               <tbody>
                  {items.map((item, index) => (
                     <tr
                        key={index}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                     >
                        <Td>{index + 1}</Td>
                        <Td>{item.productName}</Td>
                        <Td>{item.publisherName}</Td>
                        <Td className="font-semibold">
                           {item.creditBalance.toLocaleString()}
                        </Td>
                     </tr>
                  ))}
               </tbody>

               <tfoot>
                  <tr className="bg-gray-100 text-right text-gray-800 font-semibold">
                     <td colSpan={3} className="p-4">
                        Total Credit Balance
                     </td>
                     <td className="p-4 text-lg font-bold">
                        {totalCreditBalance.toLocaleString()}
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>

         <div className="mt-12 flex justify-end gap-4">
            <button
               onClick={onClose}
               className="px-8 py-2 rounded-full border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition"
            >
               Close
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

const Th = ({
   children,
   className = "",
}: {
   children: React.ReactNode;
   className?: string;
}) => (
   <th className={`p-4 font-semibold text-gray-700 ${className}`}>
      {children}
   </th>
);

const Td = ({
   children,
   className = "",
 }: {
   children: React.ReactNode;
   className?: string;
 }) => <td className={`p-4 text-gray-800 ${className}`}>{children}</td>;