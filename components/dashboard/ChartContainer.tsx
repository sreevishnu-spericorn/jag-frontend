import React from "react";
import { MiscIcons } from './DashboardIcons';

const ChartContainer = ({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) => (
   <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-lg font-bold text-slate-800">{title}</h2>
         <div className="flex items-center gap-3">
            <button className="flex items-center text-xs font-medium text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors">
               <MiscIcons.Export />
               Export
            </button>
            <button className="flex items-center text-xs font-medium text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors uppercase">
               LAST 90 DAYS
               <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M19 9l-7 7-7-7"
                  />
               </svg>
            </button>
         </div>
      </div>
      {children}
   </div>
);

export default ChartContainer;
