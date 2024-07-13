import { useSession, signIn, signOut } from "next-auth/react";
import style from "./Navbar.module.scss";
const NavbarView = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div className={style.navbar}>
      <h1>Navbar</h1>
      <button className={style.navbar__button} onClick={() => (data ? signOut() : signIn())}>
        {data ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export default NavbarView;
