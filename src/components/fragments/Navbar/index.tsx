import { useSession, signIn, signOut } from "next-auth/react";
import style from "./Navbar.module.scss";
import Button from "@/components/ui/button";
import Link from "next/link";
const NavbarView = () => {
  const { data } = useSession();
  return (
    <div className={style.navbar}>
      <h1 className={style.navbar__logo}>Navbar</h1>
      <div className={style.navbar__contains}>
        <ul className={style.navbar__contains__menu_list}>
          <li className={style.navbar__contains__menu_list__item}>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <Button className={style.navbar__contains__button} onClick={() => (data ? signOut() : signIn())} varian="primary">
          {" "}
          {data ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default NavbarView;
