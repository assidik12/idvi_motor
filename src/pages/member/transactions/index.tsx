import TransactionMemberview from "@/components/views/member/Transaction";
import UserServices from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfilePage = ({ setToaster }: any) => {
  const [users, setUsers] = useState<User | any>({});
  const session: any = useSession();
  useEffect(() => {
    if (session.data?.accessToken && Object.keys(users).length === 0) {
      const getUser = async () => {
        const { data } = await UserServices.getProfile(session.data?.accessToken);
        setUsers(data.data);
      };
      getUser();
    }
  }, [users, session]);

  return (
    <>
      <TransactionMemberview profile={users} session={session} setProfile={setUsers} setToaster={setToaster} />
    </>
  );
};

export default UserProfilePage;
