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

function Nav() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-items-center"
      style={{width: "50%", margin: "0 auto"}}
    >
      <Avatar>
        <AvatarImage src="./TNBLogo.png" />
        <AvatarFallback>TNB Logo</AvatarFallback>
      </Avatar>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Taxe sur les terrains non bâtis</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>terrains Exo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>terrains non Exo</MenubarItem>
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
