"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { createProduct, updateProduct } from "@/lib/api/products";
import { ProductDTO } from "@/types/products";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface FormValues {
   productName: string;
}

interface AddProductFormProps {
   mode: "add" | "edit";
   product?: ProductDTO | null;
   onClose: () => void;
   onProductCreated: () => void;
   accessToken: string | null;
}

export default function AddProductForm({
   mode,
   product,
   onClose,
   onProductCreated,
   accessToken,
}: AddProductFormProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<FormValues>();

   useEffect(() => {
      if (mode === "edit" && product) {
         reset({
            productName: product.productName,
         });
      } else {
         reset({ productName: "" });
      }
   }, [product, mode, reset]);

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
         if (mode === "edit" && product?.id) {
            await updateProduct(product.id, data, accessToken);
            toast.info("Product updated");
         } else {
            await createProduct(data, accessToken);
            toast.success("Product created successfully");
         }
         onProductCreated();
         reset();
         onClose();
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className="rounded-2xl w-full max-w-[700px] mx-auto overflow-hidden bg-white">
         <div className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">
               {mode === "edit" ? "Edit Product" : "Add Product"}
            </h2>
         </div>

         <div className="px-8 py-6">
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="space-y-6 flex flex-col"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-6">
                     <Input
                        label="Product Name"
                        id="productName"
                        placeholder="Enter product name"
                        {...register("productName", {
                           required: "Product name is required",
                        })}
                        error={errors.productName?.message}
                        inputClassName="border border-gray-300"
                     />

                     <Input
                        label="Category"
                        disabled
                        value="Default Category"
                        inputClassName="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                     />
                  </div>

                  <div className="flex flex-col gap-6">
                     <Input
                        label="Tags"
                        disabled
                        value="General, Example"
                        inputClassName="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                     />

                     <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                           Status
                        </label>
                        <select
                           disabled
                           className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                        >
                           <option>Active</option>
                           <option>Inactive</option>
                        </select>
                     </div>
                  </div>
               </div>

               <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
                  <Button
                     type="button"
                     onClick={onClose}
                     className="px-6 py-3 w-[150px] h-11 mr-4 text-[#12ABAA] border border-[#12ABAA] font-medium hover:bg-gray-50 transition duration-200 cursor-pointer"
                  >
                     Cancel
                  </Button>
                  <Button
                     type="submit"
                     className="px-8 py-3 w-[150px] h-11 bg-[#12ABAA] text-white font-medium shadow-lg hover:bg-cyan-600 transition duration-200 cursor-pointer"
                  >
                     Save
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}
