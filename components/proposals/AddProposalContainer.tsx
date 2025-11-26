"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { FiHome } from "react-icons/fi";
import ProductRow from "./ProductRow";
import { ClientDTO, PaginatedClients } from "@/types/clients";
import Modal from "../common/Modal";
import AddProductForm from "./AddProductForm";
import { PaginatedPublishers } from "@/types/publishers";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { createProposal, updateProposal } from "@/lib/api/proposals";
import { CreateProposalDTO } from "@/types/proposals";

export interface AddProposalContainerProps {
   accessToken: string | null;
   initialClientData: PaginatedClients;
   initialPublisherData: PaginatedPublishers;
   editProposal?: any;
}

export default function AddProposalContainer({
   accessToken,
   initialClientData,
   initialPublisherData,
   editProposal,
}: AddProposalContainerProps) {
   const [selectedClient, setSelectedClient] = useState<ClientDTO | null>(null);
   const [isAddProductOpen, setAddProductOpen] = useState(false);
   const [products, setProducts] = useState<any[]>([]);
   const [proposalName, setProposalName] = useState("");
   const [ccEmail, setCcEmail] = useState("");
   const [errors, setErrors] = useState<{
      client?: string;
      proposalName?: string;
   }>({});
   const router = useRouter();

   const handleAddProduct = (newProduct: any) => {
      setProducts((prev) => {
         const existing = prev.find(
            (p) =>
               p.productId === newProduct.productId &&
               p.publisherId === newProduct.publisherId
         );

         if (existing) {
            return prev.map((p) =>
               p.productId === newProduct.productId &&
               p.publisherId === newProduct.publisherId
                  ? {
                       ...p,
                       quantity: p.quantity + newProduct.quantity,
                       total: (p.quantity + newProduct.quantity) * p.price,
                    }
                  : p
            );
         }

         return [...prev, newProduct];
      });
   };

   const handleIncrease = (id: string) => {
      setProducts((prev) =>
         prev.map((p) =>
            p.productId === id
               ? {
                    ...p,
                    quantity: p.quantity + 1,
                    total: (p.quantity + 1) * p.price,
                 }
               : p
         )
      );
   };

   const handleDecrease = (id: string) => {
      setProducts((prev) =>
         prev.map((p) =>
            p.productId === id && p.quantity > 1
               ? {
                    ...p,
                    quantity: p.quantity - 1,
                    total: (p.quantity - 1) * p.price,
                 }
               : p
         )
      );
   };

   const handleRemove = (id: string) => {
      setProducts((prev) => prev.filter((p) => p.productId !== id));
   };

   const grandTotal = products.reduce((sum, p) => sum + p.total, 0);

   const validateForm = () => {
      const newErrors: any = {};

      if (!selectedClient) newErrors.client = "Client is required";
      if (!proposalName.trim())
         newErrors.proposalName = "Proposal name is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSave = async () => {
      if (!validateForm()) return;
      if (products.length === 0)
         return alert("Must contain atleast one product");

      const payload = {
         clientId: selectedClient!.id,
         proposalName,
         ccEmail: ccEmail || null,
         products: products.map((p) => ({
            publisherId: p.publisherId,
            productId: p.productId,
            quantity: p.quantity,
            price: p.price,
            total: p.total,
         })),
      };

      try {
         if (!accessToken) return;

         if (editProposal) {
            await updateProposal(editProposal.id, payload, accessToken);
         } else {
            await createProposal(payload, accessToken);
         }

         router.push("/proposals");
         router.refresh();
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (editProposal) {
         const matchedClient = initialClientData.clients.find(
            (c) => c.id === editProposal.clientId
         );

         setSelectedClient(matchedClient || null);
         setProposalName(editProposal.proposalName);
         setCcEmail(editProposal.ccEmail || "");
         setProducts(
            editProposal.products.map((p: any) => ({
               ...p,
               productName: p.product?.productName || "",
               price: p.price,
               quantity: p.quantity,
               total: p.total,
            }))
         );
      }
   }, [editProposal, initialClientData]);

   return (
      <form
         className="min-h-screen w-full p-8"
         onSubmit={(e) => e.preventDefault()}
      >
         <div className="max-w-full mx-auto">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <span>Proposals</span>
               <span className="text-gray-300">/</span>
               <span className="text-gray-900 font-medium">Add Proposal</span>
            </div>

            <div className="flex flex-col space-y-8">
               <div className="bg-white p-6 rounded-[20px]">
                  <div className="p-6 rounded-[20px]">
                     <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Add Proposals
                     </h2>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                           <select
                              value={selectedClient?.id || ""}
                              onChange={(e) => {
                                 const client =
                                    initialClientData.clients.find(
                                       (c: ClientDTO) => c.id === e.target.value
                                    ) || null;
                                 setSelectedClient(client);
                                 setErrors((prev) => ({
                                    ...prev,
                                    client: undefined,
                                 }));
                              }}
                              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                           >
                              <option value="">Select Client</option>
                              {initialClientData.clients.map((client) => (
                                 <option key={client.id} value={client.id}>
                                    {client.accountName}
                                 </option>
                              ))}
                           </select>
                           {errors.client && (
                              <p className="text-red-500 text-sm">
                                 {errors.client}
                              </p>
                           )}
                        </div>
                        <div>
                           <Input
                              type="text"
                              placeholder="Proposal Name"
                              value={proposalName}
                              onChange={(e) => {
                                 setProposalName(e.target.value);
                                 setErrors((prev) => ({
                                    ...prev,
                                    proposalName: undefined,
                                 }));
                              }}
                              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                           />
                           {errors.proposalName && (
                              <p className="text-red-500 text-sm">
                                 {errors.proposalName}
                              </p>
                           )}
                        </div>
                        <div className="flex items-center">
                           <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full shadow-sm">
                              <p className="text-gray-500 text-sm font-medium mb-1">
                                 Email
                              </p>
                              <p
                                 className={`font-semibold ${
                                    selectedClient?.email
                                       ? "text-gray-800"
                                       : "text-gray-400 italic"
                                 }`}
                              >
                                 {selectedClient?.email || "—"}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* CC & Add Product */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                           <Input
                              type="email"
                              placeholder="CC"
                              value={ccEmail}
                              onChange={(e) => setCcEmail(e.target.value)}
                              className="w-full h-12 px-4 border text-black border-gray-300 rounded-full focus:ring-teal-500 focus:border-teal-500"
                           />
                        </div>

                        <div className="flex justify-end items-center">
                           <button
                              disabled={!selectedClient}
                              onClick={() => setAddProductOpen(true)}
                              className={`flex items-center justify-center border-2 py-2 px-4 rounded-lg font-semibold w-full md:w-auto
                                 ${
                                    selectedClient
                                       ? "bg-white text-teal-600 border-teal-500 hover:bg-teal-50"
                                       : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                 }
                              `}
                           >
                              <Plus className="h-4 w-4 mr-1 stroke-2" />
                              Add Product
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Added Products */}
               <div className="bg-white p-6 rounded-[20px] shadow-xl shadow-gray-100 border border-gray-100 flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                     Added Products
                  </h2>

                  <div className="overflow-x-auto max-h-[calc(100vh-320px)] custom-scroll pr-3">
                     <table
                        className="w-full border-separate min-w-max"
                        style={{ borderSpacing: "0 10px" }}
                     >
                        <thead className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                           <tr>
                              <th className="py-3 px-6">Product Name</th>
                              <th className="py-3 px-6">Budget</th>
                              <th className="py-3 px-6">Quantity</th>
                              <th className="py-3 px-6">Total Amount</th>
                              <th className="py-3 px-6">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                           {products.map((product) => (
                              <ProductRow
                                 key={product.productId}
                                 id={product.productId}
                                 productName={product.productName}
                                 budget={product.price}
                                 quantity={product.quantity}
                                 total={product.total}
                                 onIncrease={handleIncrease}
                                 onDecrease={handleDecrease}
                                 onRemove={handleRemove}
                              />
                           ))}
                        </tbody>
                     </table>
                  </div>

                  <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                     <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-12 mb-6">
                           <span className="text-base font-semibold text-gray-800">
                              Total
                           </span>
                           <span className="text-xl font-extrabold text-gray-900 ml-4">
                              ₹ {grandTotal}
                           </span>
                        </div>

                        <div className="flex space-x-3">
                           <Button className="bg-white border-2 border-teal-500 text-teal-500 font-semibold py-2 px-5 rounded-lg hover:bg-teal-50 transition duration-150">
                              Send
                           </Button>

                           <Button
                              onClick={handleSave}
                              className="bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-teal-600 transition duration-150"
                           >
                              Save
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <Modal
            isOpen={isAddProductOpen}
            onClose={() => setAddProductOpen(false)}
            size="md"
         >
            <AddProductForm
               onClose={() => setAddProductOpen(false)}
               publishersData={initialPublisherData}
               onAddProduct={handleAddProduct}
            />
         </Modal>
      </form>
   );
}
