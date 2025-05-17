"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isDisabled: boolean;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname(); // get current route

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              pathname === `/${item.title.toLowerCase()}`;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} disabled={true}>
                  <a
                    href={item.url}
                    onClick={(e) => item.isDisabled && e.preventDefault()}
                    aria-disabled={item.isDisabled}
                    tabIndex={item.isDisabled ? -1 : 0}
                    className={cn(
                      item.isDisabled &&
                        "text-muted-foreground pointer-events-none"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
