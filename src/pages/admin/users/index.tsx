import UserAdminView from "@/components/views/admin/User";
import UserServices from "@/services/user";
import { useEffect, useState } from "react";

const AdimnUserPage = () => {
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
      <UserAdminView users={users} />
    </>
  );
};

export default AdimnUserPage;
