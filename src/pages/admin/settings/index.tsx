import LandingPageSettingsPage from "@/components/views/admin/Setting";
import UserServices from "@/services/user";
import { useEffect, useState } from "react";

const SettingAdminPage = ({ setToaster }: any) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllusers = async () => {
      const { data } = await UserServices.getAllUsers();
      setUsers(data.data);
    };
    getAllusers();
  }, []);

  return (
    <>
      <LandingPageSettingsPage users={users} setToaster={setToaster} />
    </>
  );
};

export default SettingAdminPage;
