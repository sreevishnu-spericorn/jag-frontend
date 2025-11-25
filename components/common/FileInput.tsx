"use client";

import React, { useState } from "react";

interface FileInputProps {
   label?: string;
   multiple?: boolean;
   accept?: string;
   onChange: (files: FileList | null) => void;
   preview?: string | string[];
}

export const FileInput = ({
   label,
   multiple,
   accept,
   onChange,
   preview,
}: FileInputProps) => {
   const [previewFiles, setPreviewFiles] = useState<string[]>(
      Array.isArray(preview) ? preview : preview ? [preview] : []
   );

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      onChange(files);

      const filePreviews = Array.from(files).map((file) =>
         URL.createObjectURL(file)
      );
      setPreviewFiles(filePreviews);
   };

   return (
      <div className="flex flex-col gap-2">
         {label && (
            <span className="text-sm font-medium text-gray-600">{label}</span>
         )}
         <input
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
         />
         {previewFiles.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
               {previewFiles.map((src, i) => (
                  <img
                     key={i}
                     src={src}
                     alt={`preview-${i}`}
                     className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  />
               ))}
            </div>
         )}
      </div>
   );
};
