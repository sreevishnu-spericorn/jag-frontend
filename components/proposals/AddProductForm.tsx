"use client";

import { X } from "lucide-react";
import React, { useMemo } from "react";
import DisabledSelect from "../common/DisabledSelect";
import { Button } from "../common/Button";
import { PaginatedPublishers, PublisherProductDTO } from "@/types/publishers";
import { useForm } from "react-hook-form";

interface AddProductFormProps {
   onClose: () => void;
   publishersData: PaginatedPublishers;
}

interface FormValues {
   publisherId: string;
   productId: string;
   quantity: number;
}

export default function AddProductForm({
   onClose,
   publishersData,
}: AddProductFormProps) {
   const {
      register,
      watch,
      setValue,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: {
         quantity: 1,
      },
   });

   const publisherId = watch("publisherId");
   const productId = watch("productId");
   const quantity = watch("quantity");

   const selectedPublisher = useMemo(() => {
      return (
         publishersData.publishers.find((p) => p.id === publisherId) || null
      );
   }, [publisherId, publishersData]);

   const publisherProducts: PublisherProductDTO[] =
      selectedPublisher?.products || [];

   const selectedProduct = publisherProducts.find(
      (pp) => pp.productId === productId
   );

   const price = selectedProduct?.price || 0;
   const total = price * quantity;

   const increment = () => setValue("quantity", quantity + 1);
   const decrement = () => {
      if (quantity > 1) setValue("quantity", quantity - 1);
   };

   const onSubmit = (data: FormValues) => {
      const payload = {
         ...data,
         price,
         total,
      };
      console.log("FINAL PRODUCT PAYLOAD:", payload);
      onClose();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">Add Product</h2>
            <Button onClick={onClose}>
               <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </Button>
         </div>

         <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
            <DisabledSelect label=" Publisher Tag" disabled>
               <option>Select Publisher Tag</option>
            </DisabledSelect>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                     Publisher
                  </label>
                  <select
                     {...register("publisherId", {
                        required: "Publisher is required",
                     })}
                     className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-gray-50"
                  >
                     <option value="">Select Publisher</option>
                     {publishersData.publishers.map((pub) => (
                        <option key={pub.id} value={pub.id}>
                           {pub.publisherName}
                        </option>
                     ))}
                  </select>
                  {errors.publisherId && (
                     <p className="text-red-500 text-sm">
                        {errors.publisherId.message}
                     </p>
                  )}
               </div>
               <DisabledSelect label="Products Type" disabled>
                  <option>Select Product Type</option>
               </DisabledSelect>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                     Products
                  </label>
                  <select
                     {...register("productId", {
                        required: "Product is required",
                     })}
                     disabled={!publisherId}
                     className={`w-full h-12 rounded-xl border px-4 ${
                        publisherId
                           ? "border-gray-300 bg-gray-50"
                           : "border-gray-200 bg-gray-100 cursor-not-allowed"
                     }`}
                  >
                     <option value="">Select Product</option>

                     {publisherProducts.map((pp) => (
                        <option key={pp.id} value={pp.productId}>
                           {pp.product.productName} — ₹{pp.price}
                        </option>
                     ))}
                  </select>
                  {errors.productId && (
                     <p className="text-red-500 text-sm">
                        {errors.productId.message}
                     </p>
                  )}
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                     Quantity
                  </label>
                  <div className="flex items-center h-12 rounded-xl border border-gray-300 bg-gray-50 px-4">
                     <Button
                        type="button"
                        onClick={decrement}
                        className="text-lg font-bold px-3"
                     >
                        -
                     </Button>
                     <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="flex-1 text-center bg-transparent outline-none font-semibold"
                     />
                     <Button
                        type="button"
                        onClick={increment}
                        className="text-lg font-bold px-3"
                     >
                        +
                     </Button>
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium text-gray-600">
                  Total
               </label>
               <input
                  type="text"
                  readOnly
                  value={price ? `₹ ${total}` : "—"}
                  className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-gray-50 font-semibold text-teal-600"
               />
            </div>
         </div>

         <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-gray-100">
            <Button
               onClick={onClose}
               className="px-8 py-2 rounded-full border border-teal-500 text-teal-500 font-semibold"
            >
               Cancel
            </Button>
            <Button className="px-6 py-2 rounded-full bg-teal-500 text-white font-semibold">
               Add Product
            </Button>
         </div>
      </form>
   );
}
