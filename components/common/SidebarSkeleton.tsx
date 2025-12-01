export const SidebarSkeleton = () => {
   return (
      <aside className="w-[292px] h-screen bg-slate-900 flex flex-col py-10 px-6">
         {/* Logo Placeholder */}
         <div className="w-[232px] h-8 bg-slate-800 rounded-md animate-pulse mb-14" />

         {/* Nav Section */}
         <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
               <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/60 animate-pulse"
               >
                  <div className="w-5 h-5 bg-slate-700 rounded-md" />
                  <div className="h-3 w-24 bg-slate-700 rounded-md" />
               </div>
            ))}

            {/* My Accounts */}
            <div className="mt-6">
               <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/60 animate-pulse">
                  <div className="w-5 h-5 bg-slate-700 rounded-md" />
                  <div className="h-3 w-32 bg-slate-700 rounded-md" />
               </div>

               <div className="ml-8 mt-3 flex flex-col gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                     <div
                        key={i}
                        className="h-3 w-20 bg-slate-800 rounded-md animate-pulse"
                     />
                  ))}
               </div>
            </div>
         </div>
      </aside>
   );
};
