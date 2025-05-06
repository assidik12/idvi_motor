import instance from "@/lib/axios/instace";

export const UserServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any, token: any) =>
    instance.put(`/api/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: (token: string) =>
    instance.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProfile: (token: string, data: any) =>
    instance.put(`/api/user/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default UserServices;
