import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
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

  // Komponen untuk tombol aksi agar tidak duplikasi kode
  const ActionButtons = ({ user }: { user: User }) => (
    <div className="flex gap-2 justify-end md:justify-center">
      <Button type="button" onClick={() => setModalUpdateduser(user)} className="p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-1" aria-label="Update User">
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
        <span className="text-sm hidden sm:inline">Ubah</span>
      </Button>
      <Button type="button" onClick={() => setModalDeleteuser(user)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1" aria-label="Delete User">
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
        <span className="text-sm hidden sm:inline">Hapus</span>
      </Button>
    </div>
  );

  return (
    <>
      <AdminLayout>
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Manajemen Pengguna</h1>

          {/* Tampilan Kartu untuk Mobile (hidden di md ke atas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {userData.map((user: User) => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 pr-2">{user.fullname}</h3>
                    <span className="flex-shrink-0 px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">{user.role}</span>
                  </div>
                  <p className="text-sm text-gray-600 break-all">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-2 font-mono break-all">ID: {user.id}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <ActionButtons user={user} />
                </div>
              </div>
            ))}
          </div>

          {/* Tampilan Tabel untuk Desktop (hidden di bawah md) */}
          <div className="hidden md:block bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-600">Nama Lengkap</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Role</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userData.map((user: User) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 whitespace-nowrap">{user.fullname}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">{user.role}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <ActionButtons user={user} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
      {Object.keys(modalUpdatedUser).length !== 0 && <ModalUpdateUser modalUpdateUser={modalUpdatedUser} setModalUpdateuser={setModalUpdateduser} setUserData={setUserData} userData={userData} session={data} setToaster={setToaster} />}
      {Object.keys(modalDeleteUser).length !== 0 && <ModalDeleteUser modalDeleteUser={modalDeleteUser} setModalDeleteuser={setModalDeleteuser} setUserData={setUserData} userData={userData} session={data} setToaster={setToaster} />}
    </>
  );
};

export default UserAdminView;
