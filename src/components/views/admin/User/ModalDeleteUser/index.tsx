import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import UserServices from "@/services/user";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/types/user.type";

type propsType = {
  modalDeleteUser: Dispatch<SetStateAction<any>> | any;
  setModalDeleteuser: Dispatch<SetStateAction<any>>;
  setUserData: Dispatch<SetStateAction<any>>;
  userData: User | any;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};
const ModalDeleteUser = (props: propsType) => {
  const { modalDeleteUser, setModalDeleteuser, setUserData, session, setToaster } = props;
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    const result = await UserServices.deleteUser(modalDeleteUser.id, session.accessToken);
    if (result.status) {
      const { data } = await UserServices.getAllUsers();

      setModalDeleteuser({});
      setToaster({ message: "Delete user success", varian: "Success" });
      setUserData(data.data);
      setLoading(false);
    } else {
      setToaster({ message: "Delete user failed", varian: "Error" });
      setLoading(false);
    }
  };
  return (
    <Modal onClose={() => setModalDeleteuser({})}>
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Are you sure to delete {modalDeleteUser.fullname}?</h1>
        <div className="flex justify-center gap-2 py-3">
          <Button varian="danger" className="w-1/2 p-2.5 rounded-lg hover:bg-red-600" onClick={deleteUser}>
            {loading ? "loading..." : "Delete"}
          </Button>
          <Button onClick={() => setModalDeleteuser({})} className={"rounded-lg p-2.5 w-1/2 bg-gray-500 text-black hover:bg-gray-600"}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
