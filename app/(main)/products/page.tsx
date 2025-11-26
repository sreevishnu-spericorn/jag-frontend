import ProductsContainer from "@/components/products/ProductsContainer";
import { fetchProducts } from "@/lib/api/products";
import { fetchPublishers } from "@/lib/api/publishers";
import { getServerAccessToken } from "@/lib/data/serverAuth";

export default async function Page() {
   const accessToken = await getServerAccessToken();
   console.log("AccessToken from cookies", accessToken);
   if (!accessToken) {
      return (
         <p className="text-xl p-10 text-red-500">
            Authentication failed. Please log in again.
         </p>
      );
   }

   const initialData = await fetchProducts(1, 10, "", null, null, accessToken);
   const publishersData = await fetchPublishers(1, 10, "", accessToken);

   console.log(publishersData);

   return (
      <div className="w-full h-full px-10 py-3">
         <ProductsContainer
            initialData={initialData}
            publishersData={publishersData}
         />
      </div>
   );
}
