import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function ChangePasswordPage() {
   return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
         <div className="w-full max-w-5xl">
            {/* 5xl ensures ~80% width beautifully */}
            <ChangePasswordForm />
         </div>
      </div>
   );
}
