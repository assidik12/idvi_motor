import instance from "@/lib/axios/instace";

export const AUthService = {
  registerAccouunt: (data: any) => instance.post("/api/user/register", data),
  signIn: (data: any) => instance.post("/api/login", data),
};

export default AUthService;
