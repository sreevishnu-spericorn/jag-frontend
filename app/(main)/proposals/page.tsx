import { getServerAccessToken } from "@/lib/data/serverAuth";
import { fetchProposals } from "@/lib/api/proposals/proposals";
import ProposalsContainer from "@/components/proposals/ProposalsContainer";

export default async function Page() {
   const accessToken = await getServerAccessToken();
   const initialData = await fetchProposals(accessToken, 1, 10, "", null, null);

   console.log("initialData", initialData);

   return (
      <div className="w-full h-full px-10 py-3">
         <ProposalsContainer initialData={initialData} />
      </div>
   );
}
