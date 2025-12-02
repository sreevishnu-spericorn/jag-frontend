"use client";

import { useState } from "react";
import { FiHome, FiPlus } from "react-icons/fi";
import { CampaignListItemDTO } from "@/types/campaigns";
import { Button } from "../common/Button";
import Modal from "../common/Modal";
import CreateAdForm from "./CreateAdForm";

interface EditCampaignContainerProps {
   campaignId: string;
   initialData: CampaignListItemDTO;
}

const Tabs = ({
   activeTab,
   setActiveTab,
}: {
   activeTab: "upcoming" | "published";
   setActiveTab: (tab: "upcoming" | "published") => void;
}) => (
   <div className="flex border-b border-gray-200 mb-6">
      <button
         onClick={() => setActiveTab("upcoming")}
         className={`py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === "upcoming"
               ? "text-blue-600 border-b-2 border-blue-600"
               : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
         }`}
      >
         Upcoming Ads
      </button>
      <button
         onClick={() => setActiveTab("published")}
         className={`py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === "published"
               ? "text-blue-600 border-b-2 border-blue-600"
               : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
         }`}
      >
         Published Ads
      </button>
   </div>
);

export default function EditCampaignContainer({
   initialData,
}: EditCampaignContainerProps) {
   const [activeTab, setActiveTab] = useState<"upcoming" | "published">(
      "upcoming"
   );

   const [showCreateAd, setShowCreateAd] = useState(false);

   const { client, publisher, product, quantity } = initialData;

   return (
      <div className="min-h-screen w-full p-8">
         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <FiHome className="h-4 w-4 text-gray-400" />
            <span>Campaigns</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Edit</span>
         </div>

         <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
            <h2 className="text-2xl font-bold text-[#1A1D1F] mb-6">Edit Ads</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 pb-4 border-b border-gray-200 mb-6">
               <div>
                  <p className="text-xs font-medium text-gray-500">
                     Client name
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                     {client.accountName}
                  </p>
               </div>
               <div>
                  <p className="text-xs font-medium text-gray-500">
                     Publisher Name
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                     {publisher.publisherName}
                  </p>
               </div>
               <div>
                  <p className="text-xs font-medium text-gray-500">Product</p>
                  <p className="text-base font-semibold text-gray-900">
                     {product?.productName || "N/A"} -{" "}
                     {new Date(initialData.createdAt).toLocaleDateString()}
                  </p>
               </div>
               <div>
                  <p className="text-xs font-medium text-gray-500">
                     Credit Balance
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                     {quantity}
                  </p>
               </div>
            </div>

            <div className="flex justify-between items-center">
               <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

               <Button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
                  onClick={() => setShowCreateAd(true)}
               >
                  <FiPlus className="h-5 w-5" /> Create Ad
               </Button>
            </div>

            {/* Advertisement Table here */}
         </div>
         <Modal
            isOpen={showCreateAd}
            onClose={() => setShowCreateAd(false)}
            size="md"
         >
            <CreateAdForm
               initialCampaignData={initialData}
               customFields={product.customFields}
               onClose={() => setShowCreateAd(false)}
            />
         </Modal>
      </div>
   );
}
