import React from "react";

const OrderItem = ({
   icon: Icon,
   pubName,
   prodName,
   amount,
   client,
}: {
   icon: React.ElementType;
   pubName: string;
   prodName: string;
   amount: string;
   client: string;
}) => (
   <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
      <div className="flex items-center gap-3 w-1/4">
         <div className="w-8 h-8 shrink-0">
            <Icon />
         </div>
         <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700">
               Publisher Name
            </span>
            <span className="text-[10px] text-slate-400">{pubName}</span>
         </div>
      </div>
      <div className="w-1/4 flex flex-col">
         <span className="text-xs font-bold text-slate-700">Product Name</span>
         <span className="text-[10px] text-slate-400">{prodName}</span>
      </div>
      <div className="w-1/6 flex flex-col">
         <span className="text-xs font-bold text-slate-700">Amount</span>
         <span className="text-[10px] text-slate-400">{amount}</span>
      </div>
      <div className="w-1/6 flex flex-col text-right">
         <span className="text-xs font-bold text-slate-700">Client</span>
         <span className="text-[10px] text-slate-400">{client}</span>
      </div>
   </div>
);
export default OrderItem;
