'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/src/components/ui/menubar";

export default function Menu() {
    return (
        <Menubar className="flex justify-center  text-4xl border-none">
            <MenubarMenu>
                <MenubarTrigger className="text-lg">Songs</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab 
                    </MenubarItem>

                    <MenubarItem>
                        New Window
                    </MenubarItem>

                    <MenubarSeparator />

                    <MenubarItem>
                        Share
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger className="text-lg">Albums</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger className="text-lg">Artists</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger className="text-lg">Ranking</MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger className="text-lg">Upcoming premieres</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    );
}
