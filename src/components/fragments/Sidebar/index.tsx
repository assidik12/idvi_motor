import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <>
      <div className="flex flex-col gap-2 p-4">
        <hr className="border-t border-gray-300 mb-2" />
        {lists.map((list) => (
          <Link href={list.href} key={list.title} className={`flex items-center gap-2 text-white hover:text-gray-400 hover:cursor-pointer rounded-lg p-2 ${pathname === list.href ? "bg-gray-700" : ""}`}>
            <i className={`text-lg mr-1.5`}>{list.icon}</i>
            <h2 className={"font-semibold"}>{list.title}</h2>
          </Link>
        ))}
        <Button type="button" varian="normal" onClick={() => signOut()} className={"mb-4 w-full rounded-lg p-2 text-lg font-bold hover:cursor-pointer hover:bg-red-700 hover:duration-300 ease-in-out"}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default SidebarView;
