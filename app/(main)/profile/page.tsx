import { getServerAccessToken } from "@/lib/data/serverAuth";
import { fetchProfile } from "@/lib/api/profile";
import ProfileContainer from "@/components/profile/ProfileContainer";

export default async function Page() {
   const accessToken = await getServerAccessToken();
   if (!accessToken) {
      return (
         <p className="text-xl p-10 text-red-500">
            Authentication failed. Please log in again.
         </p>
      );
   }

   const initialProfile = await fetchProfile(accessToken);

   return (
      <div className="w-full h-full px-10 py-3">
         <ProfileContainer
            initialProfile={initialProfile}
            accessToken={accessToken}
         />
      </div>
   );
}
