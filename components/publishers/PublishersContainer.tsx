"use client";

import { useState, useCallback } from "react";
import PublishersTable from "./PublishersTable";
import { PublishersHeader } from "./PublishersHeader";
import Modal from "../common/Modal";
import AddPublisherForm from "./AddPublisherForm";
import { FiHome } from "react-icons/fi";
import {
   getPublisherById,
   deletePublisher,
   fetchPublishers,
} from "@/lib/api/publishers";
import { PaginatedPublishers, PublisherDTO } from "@/types/publishers";
import debounce from "lodash.debounce";
import PreviewPublisher from "./PreviewPublisher";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import { PaginatedProducts } from "@/types/products";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";

export interface PublishersContainerProps {
   initialData: PaginatedPublishers;
   productsData: PaginatedProducts;
}

export default function PublishersContainer({
   initialData,
   productsData,
}: PublishersContainerProps) {
   const { accessToken } = useAuth();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [selectedPublisher, setSelectedPublisher] =
      useState<PublisherDTO | null>(null);
   const [mode, setMode] = useState<"add" | "edit">("add");
   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
   const [previewPublisher, setPreviewPublisher] =
      useState<PublisherDTO | null>(null);
   const [search, setSearch] = useState("");
   const [filterDates, setFilterDates] = useState<{
      fromDate: Date | null;
      toDate: Date | null;
   }>({
      fromDate: null,
      toDate: null,
   });

   const { data, mutate, isLoading } = useSWR(
      accessToken
         ? [
              "publishers",
              page,
              search,
              filterDates.fromDate,
              filterDates.toDate,
           ]
         : null,
      () =>
         fetchPublishers(
            page,
            10,
            search,
            accessToken,
            filterDates.fromDate,
            filterDates.toDate
         ),
      {
         fallbackData: initialData,
         revalidateOnFocus: false,
      }
   );

   const publishers = data?.publishers || [];
   const totalPages = data?.pagination.pages || 1;

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedPublisher(null);
      setMode("add");
   };

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

   const handleEdit = async (id: string) => {
      try {
         setMode("edit");
         const publisher =
            publishers.find((p: PublisherDTO) => p.id === id) || null;
         setSelectedPublisher(publisher);
         setIsModalOpen(true);
      } catch (error) {
         console.error("Failed to load publisher", error);
      }
   };

   const handleDeleteClick = (id: string) => {
      setDeleteId(id);
      setIsConfirmOpen(true);
   };

   const handleConfirmDelete = async () => {
      if (!deleteId) return;
      try {
         setLoading(true);
         await deletePublisher(deleteId, accessToken);
         mutate();
         setIsConfirmOpen(false);
         setDeleteId(null);
         toast.info("Publisher deleted successfully");
      } catch (error) {
         console.error("Delete failed", error);
         toast.error("Delete failed")
      } finally {
         setLoading(false);
      }
   };

   const handlePreview = async (id: string) => {
      try {
         const publisher = await getPublisherById(id, accessToken);
         setPreviewPublisher(publisher);
         setIsPreviewOpen(true);
      } catch (err) {
         console.error("Preview load failed", err);
      }
   };

   const handleFilter = (fromDate: Date | null, toDate: Date | null) => {
      setFilterDates({ fromDate, toDate });
      setPage(1);
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <FiHome className="h-4 w-4 text-gray-400" />
            <span>Publishers</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">All Publishers</span>
         </div>

         <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
            <PublishersHeader
               setIsModalOpen={setIsModalOpen}
               onSearch={handleSearchChange}
               onFilter={handleFilter}
            />

            <PublishersTable
               publishers={publishers}
               loading={loading}
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

         <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
            <AddPublisherForm
               mode={mode}
               publisher={selectedPublisher}
               onClose={closeModal}
               onPublisherCreated={mutate}
               products={productsData.products}
               accessToken={accessToken}
            />
         </Modal>

         <Modal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            size="sm"
         >
            <DeleteConfirmModal
               isOpen={isConfirmOpen}
               title="Delete Publisher"
               description="Are you sure you want to delete this publisher? This action cannot be undone."
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
            {previewPublisher && (
               <PreviewPublisher
                  publisher={previewPublisher}
                  onClose={() => setIsPreviewOpen(false)}
               />
            )}
         </Modal>
      </div>
   );
}
