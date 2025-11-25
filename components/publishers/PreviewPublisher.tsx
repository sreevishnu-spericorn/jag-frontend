"use client";
import { PublisherDTO } from "@/types/publishers";
import { Button } from "../common/Button";

interface PreviewPublisherProps {
   publisher: PublisherDTO;
   onClose: () => void;
}

export default function PreviewPublisher({
   publisher,
   onClose,
}: PreviewPublisherProps) {
   return (
      <div className="space-y-4 w-full max-w-lg">
         <div className="flex items-center gap-4">
            {publisher.logo && (
               <img
                  src={publisher.logo}
                  alt="Logo"
                  className="w-16 h-16 object-cover rounded"
               />
            )}
            <div>
               <h2 className="text-xl font-bold">{publisher.publisherName}</h2>
               <p className="text-gray-500">{publisher.email}</p>
               {publisher.phoneNo && (
                  <p className="text-gray-500">Phone: {publisher.phoneNo}</p>
               )}
               {publisher.whatsappNo && (
                  <p className="text-gray-500">
                     Whatsapp: {publisher.whatsappNo}
                  </p>
               )}
            </div>
         </div>

         {publisher.description && <p>{publisher.description}</p>}

         {publisher.products?.length ? (
            <div>
               <h4 className="font-semibold mb-2">Products</h4>
               <ul className="space-y-1">
                  {publisher.products.map((p) => (
                     <li key={p.id}>
                        {p.productName} - ${p.price.toFixed(2)}
                     </li>
                  ))}
               </ul>
            </div>
         ) : null}

         {publisher.w9Files?.length ? (
            <div>
               <h4 className="font-semibold mb-2">W9 Files</h4>
               <ul className="space-y-1">
                  {publisher.w9Files.map((file, idx) => (
                     <li key={idx}>
                        <a
                           href={file}
                           target="_blank"
                           className="text-blue-600 underline"
                        >
                           {file.split("/").pop()}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         ) : null}

         <div className="flex justify-end">
            <Button onClick={onClose}>
               Close
            </Button>
         </div>
      </div>
   );
}
