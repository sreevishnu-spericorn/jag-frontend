"use client";

import { useState, useCallback } from "react";
import ProposalsTable from "./ProposalsTable";
import { ProposalsHeader } from "./ProposalsHeader";
import Modal from "../common/Modal";
import { FiHome } from "react-icons/fi";
import {
   getProposalById,
   deleteProposal,
   fetchProposals,
} from "@/lib/api/proposals";
import { PaginatedProposals, ProposalDetailDTO } from "@/types/proposals";
import debounce from "lodash.debounce";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import Pagination from "../common/Pagination";
import { useRouter } from "next/navigation";
import PreviewProposal from "./PreviewProposal";

export interface ProposalsContainerProps {
   initialData: PaginatedProposals;
}

export default function ProposalsContainer({
   initialData,
}: ProposalsContainerProps) {
   const router = useRouter();

   const { accessToken } = useAuth();
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
   const [previewProposal, setPreviewProposal] =
      useState<ProposalDetailDTO | null>(null);
   const [search, setSearch] = useState("");
   const [filterDates, setFilterDates] = useState<{
      fromDate: Date | null;
      toDate: Date | null;
   }>({
      fromDate: null,
      toDate: null,
   });

   const { data, error, isLoading, mutate } = useSWR(
      accessToken
         ? ["proposals", page, search, filterDates.fromDate, filterDates.toDate]
         : null,
      () =>
         fetchProposals(
            accessToken!,
            page,
            10,
            search,
            filterDates.fromDate,
            filterDates.toDate
         ),
      { revalidateOnFocus: false, fallbackData: initialData }
   );

   const proposals = data?.proposals || [];
   const totalPages = data?.pagination.pages || 1;

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
      router.push(`/proposals/addProposal?editId=${id}`);
   };

   const handleFilter = (fromDate: Date | null, toDate: Date | null) => {
      setFilterDates({ fromDate, toDate });
      setPage(1);
   };

   const handleDeleteClick = (id: string) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
   };

   const handleConfirmDelete = async () => {
      if (!deleteId) return;
      if (!accessToken) return;
      try {
         setLoading(true);
         await deleteProposal(deleteId, accessToken);
         mutate();
         setIsConfirmOpen(false);
         setDeleteId(null);
      } catch (error) {
         console.error("Delete failed", error);
      } finally {
         setLoading(false);
      }
   };

   const handlePreview = async (id: string) => {
      if (!accessToken) return;
      try {
         const proposal = await getProposalById(id, accessToken);
         setPreviewProposal(proposal);
         setIsPreviewOpen(true);
      } catch (err) {
         console.error("Preview load failed", err);
      }
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <FiHome className="h-4 w-4 text-gray-400" />
            <span>Proposals</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">List</span>
         </div>

         <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
            <ProposalsHeader
               onSearch={handleSearchChange}
               onFilter={handleFilter}
            />

            <ProposalsTable
               proposals={proposals}
               loading={isLoading}
               onEdit={handleEdit}
               onDelete={handleDeleteClick}
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
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            size="sm"
         >
            <DeleteConfirmModal
               isOpen={isConfirmOpen}
               title="Delete Proposal"
               description="Are you sure you want to delete this proposal?"
               loading={loading}
               onClose={() => setIsConfirmOpen(false)}
               onConfirm={handleConfirmDelete}
            />
         </Modal>
         <Modal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            size="lg"
         >
            {previewProposal && (
               <PreviewProposal
                  proposal={previewProposal}
                  onClose={() => setIsPreviewOpen(false)}
               />
            )}
         </Modal>
      </div>
   );
}
