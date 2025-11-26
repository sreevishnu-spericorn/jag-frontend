"use client";

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartContainer from "@/components/dashboard/ChartContainer";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

interface LineChartProps {
   monthlySales: number[];
   paymentStatusCounts: Record<string, number>;
}

const PremiumLineChart = ({ monthlySales }: LineChartProps) => {
   const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
   ];

   const data = {
      labels: months,
      datasets: [
         {
            label: "Monthly Sales ($)",
            data: monthlySales,
            borderColor: "#0ea5e9",
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            tension: 0.4, // smooth curve
            fill: true,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: "#0ea5e9",
            pointHoverBackgroundColor: "#14b8a6",
         },
      ],
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: { display: false },
         tooltip: {
            mode: "index" as const,
            intersect: false,
            backgroundColor: "#1e293b",
            titleColor: "#f1f5f9",
            bodyColor: "#f1f5f9",
            titleFont: { size: 14, weight: "bold" as const }, // fix here
            bodyFont: { size: 12, weight: "normal" as const }, // fix here
         },
      },
      scales: {
         x: {
            grid: { display: false },
            ticks: { color: "#64748b", font: { size: 12 } },
         },
         y: {
            grid: { color: "rgba(203, 213, 225, 0.3)" },
            ticks: { color: "#64748b", font: { size: 12 } },
         },
      },
   };

   return (
      <ChartContainer title="Monthly Sales Trend">
         <div className="w-full h-[350px] md:h-[450px]">
            <Line data={data} options={options} />
         </div>
      </ChartContainer>
   );
};

export default PremiumLineChart;
