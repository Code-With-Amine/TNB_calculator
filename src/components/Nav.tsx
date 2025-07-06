import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./ui/toggole-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";


function Nav() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-items-center nav-bar-container">
      <Avatar>
        <Link href="/">
        <AvatarImage src="./TNBLogo.png" />
        <AvatarFallback>TNB Logo</AvatarFallback>
        </Link>
      </Avatar>

      <Menubar className="flex flex-wrap gap-3">
        <MenubarMenu>
          <MenubarTrigger>Taxe sur les terrains non bâtis</MenubarTrigger>
          <MenubarContent>
            <MenubarItem><Link href="/terrainExo">terrains Exo</Link></MenubarItem>
            <MenubarSeparator />
            <MenubarItem><Link href="/terrainNonExo">terrains non Exo</Link></MenubarItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Autre Tax</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Taxi</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Debut de boissoin</MenubarItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
                <MenubarMenu>
          <MenubarTrigger>Doc</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Comment calculer tax urbain</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Debut de boissoin</MenubarItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <ModeToggle />
    </div>
  );
}

export default Nav;
