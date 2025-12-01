import { jwtDecode } from "jwt-decode";

export interface DecodedUser {
   id: string;
   email: string;
   roleId: string;
   iat?: number;
   exp?: number;
}

export const decodeAccessToken = (token: string | null): DecodedUser | null => {
   try {
      if (!token) return null;
      return jwtDecode<DecodedUser>(token);
   } catch (err) {
      console.error("Error decoding token:", err);
      return null;
   }
};
