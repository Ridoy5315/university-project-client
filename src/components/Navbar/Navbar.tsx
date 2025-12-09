
import { getIconComponent } from "@/lib/icon-mapper";
import { getNavItems } from "@/lib/navItems.config";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import Link from "next/link";

// ];

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../shared/LogoutButton";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { UserRound } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { UserInfo } from "@/types/user.interface";

interface NavbarProps {
  user: UserInfo;
}

const Navbar = ({ user }: NavbarProps) => {
  const navItems: NavSection[] = getNavItems();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">PH Doc</span>
        </Link>

        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {navItems.map((section, idx) => {
              // If section has more than 1 item → use dropdown
              const hasDropdown = section.items.length > 1;

              return (
                <NavigationMenuItem key={idx}>
                  {hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium">
                        {section.title}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent className="p-2 w-96">
                        <ul className="flex flex-col gap-1">
                          {section.items.map((item) => {
                            const Icon = getIconComponent(item.icon);

                            return (
                              <li key={item.href}>
                                <NavigationMenuLink
                                  href={item.href}
                                  className={cn(
                                    "flex flex-row items-center gap-2 rounded-md p-2 text-xs hover:bg-accent hover:text-primary transition"
                                  )}
                                >
                                  <Icon className="h-4 w-4 shrink-0" />
                                  <span className="whitespace-nowrap">
                                    {item.title}
                                  </span>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    // If only one item → no dropdown
                    <NavigationMenuLink asChild>
                      <Link
                        href={section.items[0].href}
                        className={cn(
                          "px-3 py-2 text-sm font-medium hover:text-primary transition"
                        )}
                      >
                        {section.items[0].title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <>
              <LogoutButton></LogoutButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent cursor-pointer"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-primary w-full h-full">
                        {user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-44">
                  <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                      {user?.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
                      {user?.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserRound className="opacity-60" aria-hidden="true" />
                      {/* <Link className=" w-full" to={profilePath}>
                        Change Password
                      </Link> */}
                      Change Password
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="cursor-pointer">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="cursor-pointer">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
