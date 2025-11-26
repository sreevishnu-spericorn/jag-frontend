"use client";

import { useCallback, useState } from "react";
import ProductsTable from "./ProductsTable";
import { ProductsHeader } from "./ProductsHeader";
import Modal from "../common/Modal";
import AddProductForm from "./AddProductForm";
import { FiHome } from "react-icons/fi";
import { deleteProduct, fetchProducts } from "@/lib/api/products";
import { PaginatedProducts, ProductDTO } from "@/types/products";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import Pagination from "../common/Pagination";
import { PaginatedPublishers } from "@/types/publishers";

interface ProductsCOntainerProps {
   initialData: PaginatedProducts;
   publishersData: PaginatedPublishers;
}

export default function ProductsContainer({
   initialData,
   publishersData,
}: ProductsCOntainerProps) {
   const { accessToken } = useAuth();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [page, setPage] = useState(1);
   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
      null
   );
   const [customDeleteMessage, setCustomDeleteMessage] = useState("");
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(false);
   const [mode, setMode] = useState<"add" | "edit">("add");
   const [filterDates, setFilterDates] = useState<{
      fromDate: Date | null;
      toDate: Date | null;
   }>({
      fromDate: null,
      toDate: null,
   });

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedProduct(null);
      setMode("add");
   };

   const findPublishersUsingProduct = (productId: string) => {
      if (!publishersData?.publishers) return [];
      return publishersData.publishers.filter((publisher) =>
         publisher.products?.some((p: any) => p.productId === productId)
      );
   };

   const { data, isLoading, mutate } = useSWR(
      accessToken ? ["products", page, search, filterDates] : null,
      () =>
         fetchProducts(
            page,
            10,
            search,
            filterDates.fromDate,
            filterDates.toDate,
            accessToken!
         ),
      {
         revalidateOnFocus: false,
         fallbackData: initialData,
      }
   );

   const products = data?.products || [];
   const totalPages = data?.pagination?.pages || 1;

   const handleEdit = async (id: string) => {
      setMode("edit");
      const product = products.find((p: ProductDTO) => p.id === id);
      setSelectedProduct(product || null);
      setIsModalOpen(true);
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

   const handleDeleteClick = (id: string) => {
      const linkedPublishers = findPublishersUsingProduct(id);

      if (linkedPublishers.length > 0) {
         const publisherNames = linkedPublishers
            .map((p) => p.publisherName)
            .join(", ");

         setCustomDeleteMessage(
            `The following publishers use this product: ${publisherNames}. Are you sure you want to delete it?`
         );
      } else {
         setCustomDeleteMessage(
            "Are you sure you want to delete this product? This action cannot be undone."
         );
      }

      setDeleteId(id);
      setIsConfirmOpen(true);
   };
   const handleConfirmDelete = async () => {
      if (!deleteId) return;
      setLoading(true);
      try {
         await deleteProduct(deleteId, accessToken);
         mutate();
         setIsConfirmOpen(false);
         setDeleteId(null);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
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
            <span>Products</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">List</span>
         </div>

         <div className="bg-white rounded-[20px] p-6 border border-gray-100">
            <ProductsHeader
               setIsModalOpen={setIsModalOpen}
               onSearch={handleSearchChange}
               onFilter={handleFilter}
            />

            <ProductsTable
               products={products}
               loading={isLoading}
               onEdit={handleEdit}
               onDelete={handleDeleteClick}
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
            <AddProductForm
               mode={mode}
               product={selectedProduct}
               onClose={closeModal}
               onProductCreated={mutate}
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
               title="Delete Product"
               description={customDeleteMessage}
               loading={loading}
               onClose={() => setIsConfirmOpen(false)}
               onConfirm={handleConfirmDelete}
            />
         </Modal>
      </div>
   );
}
