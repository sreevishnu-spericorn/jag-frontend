import React from "react";

const RightPanelItem = ({
   icon: Icon,
   name,
   value,
   subtext,
}: {
   icon: React.ElementType;
   name: string;
   value: string;
   subtext?: string;
}) => (
   <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="w-10 h-10 shrink-0">
         <Icon />
      </div>
      <div className="flex-1 overflow-hidden">
         <h4 className="text-sm font-bold text-slate-800 truncate">{name}</h4>
         <p className="text-xs text-slate-400 truncate">{value}</p>
      </div>
      {subtext && (
         <div className="text-right">
            <span className="text-xs font-bold text-slate-700">{subtext}</span>
         </div>
      )}
   </div>
);

export default RightPanelItem;
