"use client";

export const ErrorMessage = ({ message }: { message?: string }) => {
   if (!message) return null;
   return <p className="text-red-500 text-xs mt-1 ml-2">{message}</p>;
};
