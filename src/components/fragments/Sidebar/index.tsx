import { useRouter } from "next/router";
import style from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";

type propsType = {
  lists: Array<{
    title: string;
    href: string;
    icon: any;
  }>;
};

const SidebarView = (props: propsType) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__top}>
        <h1 className={style.sidebar__top__title}>My Dashboard</h1>
        <div className={style.sidebar__top__list}>
          {lists.map((list) => (
            <Link href={list.href} key={list.title} className={`${style.sidebar__top__list__item} ${pathname === list.href ? style.sidebar__top__list__item__active : ""}`}>
              <i className={` ${style.sidebar__top__list__item__icon}`}>{list.icon}</i>
              <h2 className={style.sidebar__top__list__item__title}>{list.title}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className={style.sidebar__bottom}>
        <Button type="button" varian="secondary" onClick={() => signOut()} className={style.sidebar__bottom__button}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SidebarView;
