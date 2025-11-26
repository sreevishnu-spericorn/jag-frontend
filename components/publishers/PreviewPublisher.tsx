"use client";

import { PublisherDTO } from "@/types/publishers";
import { Button } from "../common/Button";
import { Building2, Phone, Mail, FileText, Globe, User } from "lucide-react";

interface PreviewPublisherProps {
   publisher: PublisherDTO;
   onClose: () => void;
}

export default function PreviewPublisher({
   publisher,
   onClose,
}: PreviewPublisherProps) {
   return (
      <div className="w-full h-full max-h-[90vh] overflow-y-auto bg-slate-50 p-10">
         {/* HEADER */}
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-6">
               {/* Logo */}
               {publisher.logo && (
                  <img
                     src={`http://localhost:3457/${publisher.logo}`}
                     alt="Logo"
                     className="w-20 h-20 rounded-xl object-contain border border-slate-200 shadow-sm"
                  />
               )}

               <div>
                  <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
                     {publisher.publisherName}
                  </h2>
                  <p className="text-slate-500 mt-1">{publisher.email}</p>

                  {/* Contact Row */}
                  <div className="flex gap-6 mt-4 text-sm text-slate-600">
                     {publisher.phoneNo && (
                        <div className="flex items-center gap-1">
                           <Phone className="w-4 h-4 text-teal-600" />
                           {publisher.phoneNo}
                        </div>
                     )}
                     {publisher.whatsappNo && (
                        <div className="flex items-center gap-1">
                           💬 {publisher.whatsappNo}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* DESCRIPTION */}
         {publisher.description && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
               <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  About Publisher
               </h3>
               <p className="text-slate-600 leading-relaxed">
                  {publisher.description}
               </p>
            </div>
         )}

         {/* PRODUCTS */}
         {publisher.products!?.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
               <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Products & Pricing
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {publisher.products!.map((p) => (
                     <div
                        key={p.id}
                        className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-teal-500 transition-all"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                              {p.product.productName.charAt(0)}
                           </div>

                           <div>
                              <p className="font-medium text-slate-800">
                                 {p.product.productName}
                              </p>
                           </div>
                        </div>

                        <p className="text-lg font-semibold text-teal-600">
                           ${p.price.toFixed(2)}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* W9 FILES */}
         {publisher.w9Files!.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
               <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  W9 Documents
               </h3>

               <div className="space-y-3">
                  {publisher.w9Files!.map((file, idx) => (
                     <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-teal-500 transition-colors"
                     >
                        <div className="flex items-center gap-3">
                           <FileText className="w-5 h-5 text-teal-600" />

                           <p className="text-slate-700 font-medium">
                              {file.split("/").pop()}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* FOOTER */}
         <div className="flex justify-end mt-10">
            <Button
               onClick={onClose}
               className="
         px-7 py-2 rounded-xl text-sm font-medium
         bg-linear-to-r from-teal-500 to-teal-600
         text-white shadow-md
         hover:shadow-lg hover:from-teal-600 hover:to-teal-700
         transition-all duration-300
      "
            >
               Close
            </Button>
         </div>
      </div>
   );
}
