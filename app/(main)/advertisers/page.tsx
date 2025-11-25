import ClientsContainer from "@/components/advertisers/ClientsContainer";
import { fetchClients } from "@/lib/api/clients";
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
   const initialData = await fetchClients(accessToken, 1, 10, "", null, null);

   return (
      <div className="w-full h-full px-10 py-3">
         <ClientsContainer initialData={initialData} />
      </div>
   );
}
