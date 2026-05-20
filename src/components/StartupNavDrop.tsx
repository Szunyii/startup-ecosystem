import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function StartupNavDrop() {
  const pathname = usePathname();
  const isActive =
    pathname === "/startup" ||
    pathname === "/ecosystem" ||
    pathname === "/startup-overview";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            triggerMode="click"
            className={cn(
              buttonVariants({ variant: "ghost", className: "px-2" }),
              "bg-transparent hover:bg-muted focus:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground",
              isActive ? " bg-white text-black" : "",
            )}
          >
            Startups
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-48 space-y-2 p-3">
              <ListItem href="/startup-overview" title="Startup overview" />
              <ListItem href="/startup" title="Startup database" />
              <ListItem href="/ecosystem" title="Startup ecosystem" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block rounded-md px-3 py-2 hover:bg-muted">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            {children ? (
              <div className="text-muted-foreground line-clamp-2">
                {children}
              </div>
            ) : null}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default StartupNavDrop;
