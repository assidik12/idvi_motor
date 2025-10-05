import instance from "@/lib/axios/instace";

const SettingsServices = {
  getSettings: () => instance.get("/api/settings"),
  updateSettings: (id: string, settings: any) => instance.put(`/api/settings/${id}`, settings),
};

export default SettingsServices;
