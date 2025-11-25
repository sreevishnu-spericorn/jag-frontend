"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FiHome } from "react-icons/fi";
import ProductRow from "./ProductRow";
import { ClientDTO, PaginatedClients } from "@/types/clients";
import Modal from "../common/Modal";
import AddProductForm from "./AddProductForm";
import { PaginatedPublishers } from "@/types/publishers";

export interface AddProposalContainerProps {
   initialClientData: PaginatedClients;
   initialPublisherData: PaginatedPublishers;
}

export default function AddProposalContainer({
   initialClientData,
   initialPublisherData,
}: AddProposalContainerProps) {
   const [selectedClient, setSelectedClient] = useState<ClientDTO | null>(null);
   const [isAddProductOpen, setAddProductOpen] = useState(false);

   const products = [
      {
         productName: "MoveIt",
         budget: "625",
         quantity: 525,
         totalAmount: "625",
      },
      {
         productName: "Fiverr",
         budget: "625",
         quantity: 525,
         totalAmount: "625",
      },
   ];

   return (
      <div className="min-h-screen w-full p-8">
         <div className="max-w-full mx-auto">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
               <FiHome className="h-4 w-4 text-gray-400" />
               <span>Proposals</span>
               <span className="text-gray-300">/</span>
               <span className="text-gray-900 font-medium">Add Proposal</span>
            </div>

            <div className="flex flex-col space-y-8">
               <div className="bg-white p-6 rounded-[20px]">
                  <div className=" p-6 rounded-[20px]">
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
                              }}
                              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                           >
                              <option value="">Select Client</option>
                              {initialClientData.clients.map(
                                 (client: ClientDTO) => (
                                    <option key={client.id} value={client.id}>
                                       {client.accountName}
                                    </option>
                                 )
                              )}
                           </select>
                        </div>

                        <div>
                           <input
                              type="text"
                              placeholder="Proposal Name"
                              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                           />
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

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                           <input
                              type="email"
                              placeholder="CC"
                              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                           />
                        </div>

                        <div className="flex justify-end items-center">
                           <button
                              onClick={() => setAddProductOpen(true)}
                              className="flex items-center justify-center bg-white text-teal-600 border-2 border-teal-500 py-2 px-4 rounded-lg font-semibold hover:bg-teal-50 transition duration-150 shadow-sm w-full md:w-auto"
                           >
                              <Plus className="h-4 w-4 mr-1 stroke-2" />
                              Add Product
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

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
                           {products.map((product, index) => (
                              <ProductRow key={index} {...product} />
                           ))}
                        </tbody>
                     </table>
                  </div>

                  {/* Total & Buttons */}
                  <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                     <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-12 mb-6">
                           <span className="text-base font-semibold text-gray-800">
                              Total
                           </span>
                           <span className="text-xl font-extrabold text-gray-900 ml-4">
                              $ 2,6554
                           </span>
                        </div>
                        <div className="flex space-x-3">
                           <button className="bg-white border-2 border-teal-500 text-teal-500 font-semibold py-2 px-5 rounded-lg hover:bg-teal-50 transition duration-150">
                              Send
                           </button>
                           <button className="bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg shadow-teal-300/50 hover:bg-teal-600 transition duration-150">
                              Save
                           </button>
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
            />
         </Modal>
      </div>
   );
}
