import { useSession, signIn, signOut } from "next-auth/react";
import style from "./Navbar.module.scss";
import Button from "@/components/ui/button";
const NavbarView = () => {
  const { data } = useSession();
  return (
    <div className={style.navbar}>
      <h1 className={style.navbar__logo}>Navbar</h1>
      <button></button>
      <Button className={style.navbar__button} onClick={() => (data ? signOut() : signIn())} varian="primary">
        {" "}
        {data ? "Sign Out" : "Sign In"}
      </Button>
    </div>
  );
};

export default NavbarView;
