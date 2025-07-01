import { useRouter } from "next/router";
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
    <div className="bg-black text-white p-8 w-2xs h-screen flex flex-col">
      <div className="flex flex-col gap-2 mb-10">
        {lists.map((list) => (
          <Link href={list.href} key={list.title} className={`flex items-center gap-2 text-white hover:text-gray-400 hover:cursor-pointer rounded-lg p-2 ${pathname === list.href ? "bg-gray-700" : ""}`}>
            <i className={`text-lg mr-1.5`}>{list.icon}</i>
            <h2 className={"font-semibold"}>{list.title}</h2>
          </Link>
        ))}
      </div>
      <Button type="button" varian="secondary" onClick={() => signOut()} className={"mb-4 w-full rounded-lg p-2.5 text-lg font-bold hover:cursor-pointer hover:bg-red-700 hover:duration-300 ease-in-out"}>
        Logout
      </Button>
    </div>
  );
};

export default SidebarView;
