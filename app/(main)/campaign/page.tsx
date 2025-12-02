import { getServerAccessToken } from "@/lib/data/serverAuth";
import { fetchCampaigns } from "@/lib/api/campaigns/campaigns";
import CampaignsContainer from "@/components/campaigns/CampaignsContainer";

export default async function Page() {
   const accessToken = await getServerAccessToken();
   const initialData = await fetchCampaigns(accessToken, 1, 10, "", null, null);

   console.log("initialCampaignData", initialData);

   return (
      <div className="w-full h-full px-10 py-3">
         <CampaignsContainer initialData={initialData} />
      </div>
   );
}
