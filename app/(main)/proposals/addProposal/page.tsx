import AddProposalContainer from "@/components/proposals/AddProposalContainer";
import { fetchClients } from "@/lib/api/clients";
import { fetchPublishers } from "@/lib/api/publishers";
import { getServerAccessToken } from "@/lib/data/serverAuth";

export default async function Page() {
   const accessToken = await getServerAccessToken();
   if (!accessToken) {
      return (
         <p className="text-red-500 p-10">
            Authentication failed. Please log in again.
         </p>
      );
   }
   const initialClientData = await fetchClients(accessToken, 1, 10, "", null, null);
   const initialPublisherData = await fetchPublishers(1, 10, "", accessToken);

   return (
      <div className="w-full h-full px-10 py-3">
         <AddProposalContainer initialClientData={initialClientData} initialPublisherData={initialPublisherData}/>
      </div>
   );
}
