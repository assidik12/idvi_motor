import AdminLayout from "@/components/layouts/AdminLayout";
import style from "./UserAdmin.module.scss";
import Button from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";

const UserAdminView = (props: any) => {
  const { users, setToaster } = props;
  const { data }: any = useSession();
  const [modalUpdatedUser, setModalUpdateduser] = useState<User | {}>({});
  const [modalDeleteUser, setModalDeleteuser] = useState<User | {}>({});
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    setUserData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={style.user}>
          <h1>admin users page</h1>
          <table className={style.user__table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={style.user__table__action}>
                      <Button className={style.user__table__action__button__update} type="button" onClick={() => setModalUpdateduser(user)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                      </Button>
                      <Button className={style.user__table__action__button__delete} type="button" onClick={() => setModalDeleteuser(user)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(modalUpdatedUser).length !== 0 && <ModalUpdateUser modalUpdateUser={modalUpdatedUser} setModalUpdateuser={setModalUpdateduser} setUserData={setUserData} userData={userData} session={data} setToaster={setToaster} />}
      {Object.keys(modalDeleteUser).length !== 0 && <ModalDeleteUser modalDeleteUser={modalDeleteUser} setModalDeleteuser={setModalDeleteuser} setUserData={setUserData} userData={userData} session={data} setToaster={setToaster} />}
    </>
  );
};

export default UserAdminView;
