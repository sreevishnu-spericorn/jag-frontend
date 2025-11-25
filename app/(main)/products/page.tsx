import ProductsContainer from "@/components/products/ProductsContainer";
import { fetchProducts } from "@/lib/api/products";
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

   console.log(initialData);

   return (
      <div className="w-full h-full px-10 py-3">
         <ProductsContainer initialData={initialData} />
      </div>
   );
}
