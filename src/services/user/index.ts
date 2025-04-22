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
};

export default UserServices;
