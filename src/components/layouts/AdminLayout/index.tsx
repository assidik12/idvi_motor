import SidebarView from "@/components/fragments/Sidebar";
import style from "./AdminLayout.module.scss";

const listSideBarItem = [
  {
    title: "Dashbord",
    icon: "bxs-dashboard",
    href: "/admin",
  },
  {
    title: "Product",
    icon: "bxs-box",
    href: "/admin/products",
  },
];

type propsType = {
  children: React.ReactNode;
};

const AdminLayout = (props: propsType) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <SidebarView lists={listSideBarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
