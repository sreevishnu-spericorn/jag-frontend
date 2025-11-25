import PublishersContainer from "@/components/publishers/PublishersContainer";
import { fetchProducts } from "@/lib/api/products";
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

   const initialData = await fetchPublishers(1, 10, "", accessToken);
   const productsData = await fetchProducts(1, 10, "", null, null, accessToken);

   return (
      <div className="w-full h-full px-10 py-3">
         <PublishersContainer
            initialData={initialData}
            productsData={productsData}
         />
      </div>
   );
}
