import React from "react";

interface ChartProps {
   data: number[];
   labels: string[];
   type: "bar" | "line";
   height?: number;
   color?: string;
}

const CustomChart: React.FC<ChartProps> = ({
   data,
   labels,
   type,
   height = 200,
   color = "#0ea5e9",
}) => {
   const max = Math.max(...data) * 1.1;

   return (
      <div className="w-full flex flex-col">
         <div className="relative w-full" style={{ height: `${height}px` }}>
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
               {[0, 1, 2, 3].map((_, i) => (
                  <div
                     key={i}
                     className="w-full border-t border-dashed border-slate-200 h-0"
                  ></div>
               ))}
            </div>

            {/* Y Axis Labels (Simple approximate placement) */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 pr-2 -translate-x-full h-full py-1">
               <span>${Math.round(max)}</span>
               <span>${Math.round(max * 0.66)}</span>
               <span>${Math.round(max * 0.33)}</span>
               <span>$100</span>
            </div>

            {/* Chart Content */}
            <div className="absolute inset-0 flex items-end justify-between pl-2 pr-2">
               {type === "bar" ? (
                  data.map((val, i) => (
                     <div
                        key={i}
                        className="group relative flex flex-col items-center w-full"
                     >
                        <div
                           className="w-2 md:w-3 rounded-t-sm transition-all duration-300 hover:opacity-80"
                           style={{
                              height: `${(val / max) * 100}%`,
                              backgroundColor: color,
                           }}
                        ></div>
                        {/* Tooltip */}
                        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] px-2 py-1 rounded transition-opacity pointer-events-none">
                           ${val}
                        </div>
                     </div>
                  ))
               ) : (
                  <svg className="w-full h-full overflow-visible">
                     <polyline
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        points={data
                           .map((val, i) => {
                              const x = (i / (data.length - 1)) * 100;
                              const y = 100 - (val / max) * 100;
                              return `${x}%,${y}%`;
                           })
                           .join(" ")}
                        className="drop-shadow-md"
                     />
                     {data.map((val, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const y = 100 - (val / max) * 100;
                        return (
                           <circle
                              key={i}
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="3"
                              fill="white"
                              stroke={color}
                              strokeWidth="2"
                              className="hover:r-4 transition-all cursor-pointer"
                           />
                        );
                     })}
                  </svg>
               )}
            </div>
         </div>
         {/* X Axis Labels */}
         <div className="flex justify-between mt-4 pl-2 pr-2">
            {labels.map((label, i) => (
               <span
                  key={i}
                  className="text-[10px] font-medium text-slate-400 uppercase"
               >
                  {label}
               </span>
            ))}
         </div>
      </div>
   );
};

export default CustomChart;
