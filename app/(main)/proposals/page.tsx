// proposals/page.tsx

import { getServerAccessToken } from "@/lib/data/serverAuth";
import { fetchProposals } from "@/lib/api/proposals";
import ProposalsContainer from "@/components/proposals/ProposalsContainer";

export default async function Page() {
   const accessToken = await getServerAccessToken();
   if (!accessToken) {
      return (
         <p className="text-red-500 p-10">
            Authentication failed. Please log in again.
         </p>
      );
   }
   const initialData = await fetchProposals(accessToken, 1, 10, "");

   return (
      <div className="w-full h-full px-10 py-3">
         <ProposalsContainer initialData={initialData} />
      </div>
   );
}
