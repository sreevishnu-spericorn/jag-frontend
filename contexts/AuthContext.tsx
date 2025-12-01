"use client";

import {
   createContext,
   useContext,
   useState,
   useEffect,
   ReactNode,
} from "react";
import { refreshAccessToken } from "@/lib/api/refreshToken";
import { decodeAccessToken, DecodedUser } from "@/utils/decodeToken";

interface AuthContextType {
   accessToken: string | null;
   user: DecodedUser | null;
   setAccessToken: (token: string | null) => void;
   loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
   accessToken: null,
   user: null,
   setAccessToken: () => {},
   loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   const [user, setUser] = useState<DecodedUser | null>(null);
   const [loading, setLoading] = useState(true);

   const updateToken = (token: string | null) => {
      setAccessToken(token);
      setUser(decodeAccessToken(token));
   };

   useEffect(() => {
      const initializeAuth = async () => {
         try {
            const token = await refreshAccessToken();
            updateToken(token || null);
         } catch (err) {
            console.error("[AuthProvider] refresh failed:", err);
            updateToken(null);
         } finally {
            setLoading(false);
         }
      };

      initializeAuth();
   }, []);

   return (
      <AuthContext.Provider
         value={{ accessToken, user, setAccessToken: updateToken, loading }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
