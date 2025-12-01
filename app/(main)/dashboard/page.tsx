import StatCard from "@/components/dashboard/StatCard";
import {
   BrandIcons,
   MiscIcons,
   WidgetIcons,
} from "@/components/dashboard/DashboardIcons";
import { fetchClients } from "@/lib/api/clients";
import { fetchPayments } from "@/lib/api/payment";
import { getServerAccessToken } from "@/lib/data/serverAuth";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RightPanelItem from "@/components/dashboard/RightPanelItem";
import OrderItem from "@/components/dashboard/OrderItem";

const Dashboard = async () => {
   const accessToken = await getServerAccessToken();

   const [clientData, paymentData] = await Promise.all([
      fetchClients(accessToken, 1, 10, "", null, null),
      fetchPayments(accessToken, 1, 12),
   ]);

   const monthlySales = Array(12).fill(0);
   paymentData.payments.forEach((p: any) => {
      const monthIndex = new Date(p.createdAt).getMonth();
      monthlySales[monthIndex] += p.amount;
   });

   const statusCounts: Record<string, number> = {};
   paymentData.payments.forEach((p: any) => {
      const key = p.status.toLowerCase();
      statusCounts[key] = (statusCounts[key] || 0) + 1;
   });

   return (
      <div className="flex min-h-screen font-sans overflow-hidden">
         <div className="flex-1 h-screen overflow-hidden flex relative shadow-[-20px_0_40px_rgba(0,0,0,0.2)]">
            <div className="flex-1 h-full overflow-y-auto p-8 pb-20 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <StatCard
                     title="Total Sales"
                     value={paymentData.pagination.total}
                     icon={WidgetIcons.Sales}
                  />
                  <StatCard
                     title="Total Clients"
                     value={clientData.pagination.total}
                     icon={WidgetIcons.Clients}
                  />
               </div>

               <DashboardCharts
                  monthlySales={monthlySales}
                  paymentStatusCounts={statusCounts}
               />
            </div>
         </div>
         <div
            className="w-[360px] shrink-0 bg-[#F1F5F9] h-full overflow-y-auto border-l border-slate-200/50 p-6 scrollbar-thin relative cursor-not-allowed"
            style={{ pointerEvents: "none", opacity: 0.5 }}
         >
            <div className="flex items-center justify-end gap-4 mb-8">
               <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50 relative">
                  <svg
                     className="w-6 h-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                     />
                  </svg>
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <div className="flex items-center gap-3">
                  <img
                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                     alt="User"
                     className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-slate-800">
                        Alesia K.
                     </span>
                     <span className="text-[10px] text-slate-500 flex items-center cursor-pointer">
                        Business Manager
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
                     </span>
                  </div>
               </div>
            </div>

            {/* Sales by Site */}
            <div className="mb-8">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-slate-800">
                     Sales by Site
                  </h3>
                  <div className="flex gap-1">
                     <button className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100">
                        <MiscIcons.ChevronLeft />
                     </button>
                     <button className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 shadow-md shadow-teal-200">
                        <MiscIcons.ChevronRight />
                     </button>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <RightPanelItem
                     icon={BrandIcons.Movit}
                     name="Movit"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.McDonalds}
                     name="Mcdonalds"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Fiverr}
                     name="Fivver"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Mobileye}
                     name="Mobileye"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Anyto}
                     name="Anyto"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.MyHeritage}
                     name="My Heritage"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Wix}
                     name="Wix"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Airbnb}
                     name="Airbnb"
                     value="$ 25,651"
                  />
               </div>
            </div>

            {/* Last 20 Orders */}
            <div className="mb-8">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-slate-800">
                     Last 20 Orders
                  </h3>
                  <div className="flex gap-1">
                     <button className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100">
                        <MiscIcons.ChevronLeft />
                     </button>
                     <button className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 shadow-md shadow-teal-200">
                        <MiscIcons.ChevronRight />
                     </button>
                  </div>
               </div>
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <OrderItem
                     icon={BrandIcons.Wix}
                     pubName="Alex Name"
                     prodName="Alex Name"
                     amount="$564"
                     client="Fivvr"
                  />
                  <OrderItem
                     icon={BrandIcons.Anyto}
                     pubName="Alex Name"
                     prodName="Alex Name"
                     amount="$564"
                     client="Fivvr"
                  />
                  <OrderItem
                     icon={BrandIcons.Movit}
                     pubName="Alex Name"
                     prodName="Alex Name"
                     amount="$564"
                     client="Fivvr"
                  />
                  <OrderItem
                     icon={BrandIcons.Mobileye}
                     pubName="Alex Name"
                     prodName="Alex Name"
                     amount="$564"
                     client="Fivvr"
                  />
               </div>
            </div>

            {/* Top Clients */}
            <div>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-slate-800">
                     Top Clients
                  </h3>
                  <div className="flex gap-1">
                     <button className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100">
                        <MiscIcons.ChevronLeft />
                     </button>
                     <button className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 shadow-md shadow-teal-200">
                        <MiscIcons.ChevronRight />
                     </button>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <RightPanelItem
                     icon={BrandIcons.Movit}
                     name="Movit"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.McDonalds}
                     name="Mcdonalds"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Fiverr}
                     name="Fivver"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Mobileye}
                     name="Mobileye"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Anyto}
                     name="Anyto"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.MyHeritage}
                     name="My Heritage"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Wix}
                     name="Wix"
                     value="$ 25,651"
                  />
                  <RightPanelItem
                     icon={BrandIcons.Airbnb}
                     name="Airbnb"
                     value="$ 25,651"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
