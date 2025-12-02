"use client";

import { useState, useCallback } from "react";
import CampaignsTable from "./CampaignsTable";
import { CampaignsHeader } from "./CampaignsHeader";
import Modal from "../common/Modal";
import { FiHome } from "react-icons/fi";
import { getCampaignById, fetchCampaigns } from "@/lib/api/campaigns/campaigns";
import { CampaignListResponse, CampaignListItemDTO } from "@/types/campaigns";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import Pagination from "../common/Pagination";
import { useRouter } from "next/navigation";
import PreviewCampaign from "./PreviewCampaign";

export interface CampaignsContainerProps {
   initialData: CampaignListResponse;
}

export default function CampaignsContainer({
   initialData,
}: CampaignsContainerProps) {
   const router = useRouter();

   const { accessToken, user } = useAuth();
   const [page, setPage] = useState(1);
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
   const [previewCampaign, setPreviewCampaign] =
      useState<CampaignListItemDTO | null>(null);
   const [search, setSearch] = useState("");
   const [filterDates, setFilterDates] = useState<{
      fromDate: Date | null;
      toDate: Date | null;
   }>({
      fromDate: null,
      toDate: null,
   });

   const { data, isLoading } = useSWR(
      accessToken
         ? ["campaigns", page, search, filterDates.fromDate, filterDates.toDate]
         : null,
      () =>
         fetchCampaigns(
            accessToken!,
            page,
            10,
            search,
            filterDates.fromDate,
            filterDates.toDate
         ),
      { revalidateOnFocus: false, fallbackData: initialData }
   );

   const campaigns = data?.campaigns || [];
   const totalPages = data?.pagination?.pages || 1;

   const debouncedSearch = useCallback(
      debounce((value: string) => {
         setSearch(value);
         setPage(1);
      }, 500),
      []
   );

   const handleSearchChange = (value: string) => {
      debouncedSearch(value);
   };

   const handleEdit = (id: string) => {
      console.log("Edit ID ", id);
      router.push(`/campaign/editCampaign/${id}`);
   };

   const handleFilter = (fromDate: Date | null, toDate: Date | null) => {
      setFilterDates({ fromDate, toDate });
      setPage(1);
   };

   const handlePreview = async (id: string) => {
      if (!accessToken) return;
      try {
         const campaign = await getCampaignById(id, accessToken);
         setPreviewCampaign(campaign);
         setIsPreviewOpen(true);
      } catch (err) {
         console.error("Preview load failed", err);
      }
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <FiHome className="h-4 w-4 text-gray-400" />
            <span>Campaigns</span> {/* Changed breadcrumb */}
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">List</span>
         </div>

         <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
            <CampaignsHeader
               onSearch={handleSearchChange}
               role={user?.roleId} // Role still needed for button logic
               onFilter={handleFilter}
            />

            <CampaignsTable
               campaigns={campaigns}
               loading={isLoading}
               role={user?.roleId}
               onEdit={handleEdit}
               onPreview={handlePreview}
            />
         </div>

         <Pagination
            page={page}
            totalPages={totalPages}
            onChangePage={(p) => {
               setPage(p);
            }}
         />

         <Modal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            size="lg"
         >
            {previewCampaign && (
               <PreviewCampaign
                  campaign={previewCampaign}
                  role={user?.roleId}
                  onClose={() => setIsPreviewOpen(false)}
               />
            )}
         </Modal>
      </div>
   );
}
