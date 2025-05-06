import Button from "@/components/ui/button";
import style from "./ModalUpdateUser.module.scss";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import UserServices from "@/services/user";
import { User } from "@/types/user.type";

type propsType = {
  modalUpdateUser: Dispatch<SetStateAction<any>> | any;
  setModalUpdateuser: Dispatch<SetStateAction<any>>;
  setUserData: Dispatch<SetStateAction<any>>;
  userData: User | any;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalUpdateUser = (props: propsType) => {
  const { userData, modalUpdateUser, setModalUpdateuser, setUserData, session, setToaster } = props;
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form: any = e.target as HTMLFormElement;
    const query = {
      role: form.role.value,
    };

    const resut = await UserServices.updateUser(userData[0].id, query, session?.accessToken);
    if (resut.status) {
      setModalUpdateuser({});
      setLoading(false);
      const { data } = await UserServices.getAllUsers();
      setToaster({ message: "updated user success", varian: "Succes" });

      setUserData(data.data);
    } else {
      setToaster({ message: "Updated user failed", varian: "Error" });
      setLoading(false);
    }
  };
  return (
    <Modal onClose={() => setModalUpdateuser({})}>
      <h1 className={style.title}>changes role</h1>
      <form onSubmit={handleUpdateUser} className={style.form}>
        <Input label="Email" name="email" type="email" defaultValue={modalUpdateUser.email} disabled />
        <Input label="fullname" name="fullname" type="fullname" defaultValue={modalUpdateUser.fullname} disabled />
        <Select
          name="role"
          label="role"
          options={[
            { value: "admin", label: "admin" },
            { value: "user", label: "user" },
          ]}
          defaultValue={modalUpdateUser.role}
        />
        <Button type="submit" varian="primary">
          {loading ? "loading..." : "update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
