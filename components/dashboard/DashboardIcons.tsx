
export const LogoIcon = () => (
   <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="20" cy="20" r="20" fill="white" />
      <path
         d="M10 14 L16 30 L22 14 M18 14 L24 30 L30 14"
         stroke="#0B1739"
         strokeWidth="3"
         strokeLinecap="round"
         strokeLinejoin="round"
      />
   </svg>
);

export const NavIcons = {
   Dashboard: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
         />
      </svg>
   ),
   Calendar: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
         />
      </svg>
   ),
   Advertisers: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
         />
      </svg>
   ),
   Approvals: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
         />
      </svg>
   ),
   Leads: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
         />
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z"
         />
      </svg>
   ),
   Proposals: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
         />
      </svg>
   ),
   Orders: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
         />
      </svg>
   ),
   Notifications: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
         />
      </svg>
   ),
   MyAccounts: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
         />
      </svg>
   ),
   Admin: (props: any) => (
      <svg
         {...props}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.581-.495.644-.869l.214-1.281z"
         />
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
         />
      </svg>
   ),
};

export const BrandIcons = {
   Movit: () => (
      <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center">
         <svg viewBox="0 0 24 24" fill="#F97316" className="w-5 h-5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
         </svg>
      </div>
   ),
   McDonalds: () => (
      <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center">
         <svg viewBox="0 0 24 24" fill="#FACC15" className="w-5 h-5">
            <path d="M4 20v-8c0-2.21 1.79-4 4-4 1.66 0 3 1.34 3 3v5h2v-5c0-1.66 1.34-3 3-3 2.21 0 4 1.79 4 4v8h2v-8c0-3.31-2.69-6-6-6-1.93 0-3.68.93-4.8 2.38C10.68 4.93 8.93 4 7 4 3.69 4 1 6.69 1 10v10h3z" />
         </svg>
      </div>
   ),
   Fiverr: () => (
      <div className="w-full h-full rounded-full bg-[#1DBF73] flex items-center justify-center text-white font-bold text-xs">
         fi
      </div>
   ),
   Mobileye: () => (
      <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-[10px]">
         in
      </div>
   ),
   Anyto: () => (
      <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
         <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            className="w-4 h-4"
         >
            <path d="M20 6L9 17l-5-5" />
         </svg>
      </div>
   ),
   MyHeritage: () => (
      <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center">
         <div className="w-3 h-3 border-2 border-white rounded-full"></div>
      </div>
   ),
   Wix: () => (
      <div className="w-full h-full rounded-full bg-[#FFC400] flex items-center justify-center text-black font-bold text-xs">
         Wix
      </div>
   ),
   Airbnb: () => (
      <div className="w-full h-full rounded-full bg-[#FF5A5F] flex items-center justify-center">
         <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M12 2c-1.5 0-2.8 1.2-3.5 2.5C7.8 3.2 6.5 2 5 2 2.2 2 0 4.2 0 7c0 5.2 12 15 12 15s12-9.8 12-15c0-2.8-2.2-5-5-5-1.5 0-2.8 1.2-3.5 2.5-.7-1.3-2-2.5-3.5-2.5z" />
         </svg>
      </div>
   ),
};

export const WidgetIcons = {
   Sales: () => (
      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-2.25 15h-10.5a.75.75 0 010-1.5h10.5a.75.75 0 010 1.5zm0-3.75h-10.5a.75.75 0 010-1.5h10.5a.75.75 0 010 1.5zm0-3.75h-10.5a.75.75 0 010-1.5h10.5a.75.75 0 010 1.5z" />
         </svg>
      </div>
   ),
   Commission: () => (
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M21 7.5l-2.25-1.313V6A2.25 2.25 0 0016.5 3.75h-9A2.25 2.25 0 005.25 6v.188L3 7.5M21 7.5V18a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18V7.5m18 0l-9 5.25-9-5.25" />
         </svg>
      </div>
   ),
   Clients: () => (
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M16.5 7.5h-9v9h9v-9z" />
            <path
               fillRule="evenodd"
               d="M8.25 2.25A.75.75 0 019 3v.75h6V3a.75.75 0 011.5 0v.75H18a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0118 21.75H6A2.25 2.25 0 013.75 19.5V6a2.25 2.25 0 012.25-2.25h1.5V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v12.75a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
               clipRule="evenodd"
            />
         </svg>
      </div>
   ),
};

export const MiscIcons = {
   ChevronLeft: () => (
      <svg
         className="w-4 h-4"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
         />
      </svg>
   ),
   ChevronRight: () => (
      <svg
         className="w-4 h-4"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
         />
      </svg>
   ),
   Export: () => (
      <svg
         className="w-4 h-4 mr-2"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
         />
      </svg>
   ),
};
