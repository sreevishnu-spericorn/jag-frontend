export interface ClientDTO {
   id: string;
   accountName: string;
   contactName: string;
   email: string;
   phone: string;
   logo: string;
   createdAt: string;
   isDeleted: boolean;
   welcomeEmail?: string;
   status: "Active" | "Inactive";
}

export interface Pagination {
   total: number;
   page: number;
   pages: number;
   limit: number;
}

export interface PaginatedClients {
   clients: ClientDTO[];
   pagination: Pagination;
   success: boolean;
   message: string;
   statusCode: number;
}

export interface CreateClientDTO {
   accountName: string;
   contactName: string;
   email: string;
   phone: string;
   welcomeEmail: boolean;
   logo?: File;
}

export interface CreateClientDTO {
   accountName: string;
   contactName: string;
   email: string;
   phone: string;
   welcomeEmail: boolean;
   logo?: File;
}

export interface UpdateClientDTO {
   accountName: string;
   contactName: string;
   email: string;
   phone: string;
   welcomeEmail: boolean;
   logo?: string | File | null;
}

export interface FormClientDTO {
   accountName: string;
   contactName: string;
   email: string;
   phone: string;
   welcomeEmail: boolean;
   logo?: string | File | null;
}
