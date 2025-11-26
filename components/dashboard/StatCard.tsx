import React from "react";

const StatCard = ({
   title,
   value,
   icon: Icon,
}: {
   title: string;
   value: number | string;
   icon: React.ElementType;
}) => (
   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 min-w-[200px]">
      <Icon />
      <div>
         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {title}
         </h3>
         <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
   </div>
);

export default StatCard;
