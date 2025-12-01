import AddProposalContainer from "@/components/proposals/AddProposalContainer";
import { fetchClients } from "@/lib/api/clients";
import { getProposalById } from "@/lib/api/proposals/proposals";
import { fetchPublishers } from "@/lib/api/publishers";
import { getServerAccessToken } from "@/lib/data/serverAuth";

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ editId: string }>;
}) {
   const { editId } = await searchParams;
   const accessToken = await getServerAccessToken();
   if (!accessToken) {
      return (
         <p className="text-red-500 p-10">
            Authentication failed. Please log in again.
         </p>
      );
   }

   const [initialClientData, initialPublisherData, editProposal] =
      await Promise.all([
         fetchClients(accessToken, 1, 10, "", null, null),
         fetchPublishers(1, 10, "", accessToken),
         editId ? getProposalById(editId, accessToken) : null,
      ]);

   return (
      <div className="w-full h-full px-10 py-3">
         <AddProposalContainer
            accessToken={accessToken}
            initialClientData={initialClientData}
            initialPublisherData={initialPublisherData}
            editProposal={editProposal}
         />
      </div>
   );
}
