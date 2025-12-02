import { getServerAccessToken } from "@/lib/data/serverAuth";
import { getCampaignById } from "@/lib/api/campaigns/campaigns";
import EditCampaignContainer from "@/components/campaigns/EditCampaignContainer";

export default async function Page({
   params,
}: {
   params: Promise<{ editId: string }>;
}) {
   const { editId } = await params;
   const accessToken = await getServerAccessToken();

   const initialData = await getCampaignById(editId, accessToken);

   console.log("initialEditCampaignData", initialData.product.customFields);

   return (
      <div className="w-full h-full px-10 py-3">
         <EditCampaignContainer campaignId={editId} initialData={initialData} />
      </div>
   );
}
