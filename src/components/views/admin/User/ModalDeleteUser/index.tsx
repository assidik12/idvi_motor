import Modal from "@/components/ui/modal";
import style from "./ModalDeleteUser.module.scss";
import Button from "@/components/ui/button";
import UserServices from "@/services/user";
import { useState } from "react";
import { useSession } from "next-auth/react";
const ModalDeleteUser = (props: any) => {
  const { modalDeleteUser, setModalDeleteuser, setUserData } = props;
  const [loading, setLoading] = useState(false);
  const { data }: any = useSession();

  const deleteUser = async () => {
    const result = await UserServices.deleteUser(modalDeleteUser.id, data?.accessToken);
    if (result.status) {
      const { data } = await UserServices.getAllUsers();
      setModalDeleteuser({});
      setUserData(data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  return (
    <Modal onClose={() => setModalDeleteuser({})}>
      <h1 className={style.title}>Are you sure to delete {modalDeleteUser.fullname}?</h1>
      <div className={style.button}>
        <Button className={style.button__delete} onClick={deleteUser}>
          {loading ? "loading..." : "Delete"}
        </Button>
        <Button onClick={() => setModalDeleteuser({})} className={style.button__cancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
