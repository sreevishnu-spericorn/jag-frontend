export const getProfileBasePath = (roleId?: string) => {
   if (roleId === "Client") return "/client/profileManagement";
   return "/admin/profileManagement"; // default for Admin or others
};
