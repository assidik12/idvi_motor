import Button from "@/components/ui/button";
import style from "./ModalUpdateUser.module.scss";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";
import { FormEvent, useState } from "react";
import UserServices from "@/services/user";
import { useSession } from "next-auth/react";

const ModalUpdateUser = (props: any) => {
  const { modalUpdateUser, setModalUpdateuser, setUserData } = props;
  const [loading, setLoading] = useState(false);
  const { data }: any = useSession();
  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form: any = e.target as HTMLFormElement;
    const query = {
      role: form.role.value,
    };

    const resut = await UserServices.updateUser(modalUpdateUser.id, query, data?.accessToken);
    if (resut.status) {
      setModalUpdateuser({});
      setLoading(false);
      const { data } = await UserServices.getAllUsers();
      setUserData(data.data);
    } else {
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
