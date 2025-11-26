// types/profile.ts
export interface AdminProfileDTO {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   phoneNumber?: string;
   roleId: string;
}

export interface UpdateProfileDTO {
   firstName?: string;
   lastName?: string;
   email?: string;
   phoneNumber?: string;
   password?: string;
}
