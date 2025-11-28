"use client";

import { useState, useCallback } from "react";
import ClientsTable from "./ClientsTable";
import { ClientsHeader } from "./ClientsHeader";
import Modal from "../common/Modal";
import AddClientForm from "./AddClientForm";
import { FiHome } from "react-icons/fi";
import { getClientById, deleteClient, fetchClients } from "@/lib/api/clients";
import { ClientDTO, PaginatedClients } from "@/types/clients";
import debounce from "lodash.debounce";
import PreviewClient from "./PreviewClient";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";

export interface ClientsContainerProps {
   initialData: PaginatedClients;
}

export default function ClientsContainer({
   initialData,
}: ClientsContainerProps) {
   const { accessToken } = useAuth();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [selectedClient, setSelectedClient] = useState<ClientDTO | null>(null);
   const [mode, setMode] = useState<"add" | "edit">("add");
   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
   const [previewClient, setPreviewClient] = useState<ClientDTO | null>(null);
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
         ? ["clients", page, search, filterDates.fromDate, filterDates.toDate]
         : null,
      () =>
         fetchClients(
            accessToken!,
            page,
            10,
            search,
            filterDates.fromDate,
            filterDates.toDate
         ),
      { revalidateOnFocus: false, fallbackData: initialData }
   );

   const clients = data?.clients || [];
   const totalPages = data?.pagination.pages || 1;

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedClient(null);
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

   const handleFilter = (fromDate: Date | null, toDate: Date | null) => {
      setFilterDates({ fromDate, toDate });
      setPage(1);
   };

   const handleEdit = async (id: string) => {
      try {
         setMode("edit");
         const client = clients.find((c) => c.id === id) || null;
         setSelectedClient(client);
         setIsModalOpen(true);
      } catch (error) {
         console.error("Failed to load client", error);
      }
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
         await deleteClient(deleteId, accessToken);
         mutate();
         setIsConfirmOpen(false);
         setDeleteId(null);
      } catch (error) {
         console.error("Delete failed", error);
      } finally {
         setLoading(false);
         toast.success("Client Deleted Successfully");
      }
   };

   const handlePreview = async (id: string) => {
      if (!accessToken) return;
      console.log(accessToken);
      try {
         const client = await getClientById(id, accessToken);
         setPreviewClient(client);
         setIsPreviewOpen(true);
      } catch (err) {
         console.error("Preview load failed", err);
      }
   };

   return (
      <div className="min-h-screen w-full p-8">
         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <FiHome className="h-4 w-4 text-gray-400" />
            <span>Advertisers</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Clients</span>
         </div>

         <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100 border border-gray-100">
            <ClientsHeader
               setIsModalOpen={setIsModalOpen}
               onFilter={handleFilter}
               onSearch={handleSearchChange}
            />

            <ClientsTable
               clients={clients}
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

         <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
            <AddClientForm
               mode={mode}
               client={selectedClient}
               onClose={closeModal}
               onClientCreated={mutate}
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
               title="Delete Client"
               description="Are you sure you want to delete this client? This action cannot be undone."
               loading={loading}
               onClose={() => setIsConfirmOpen(false)}
               onConfirm={handleConfirmDelete}
            />
         </Modal>
         <Modal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            size="md"
         >
            <PreviewClient
               client={previewClient}
               onClose={() => setIsPreviewOpen(false)}
            />
         </Modal>
      </div>
   );
}
