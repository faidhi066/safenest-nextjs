"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import {
  ArrowRightLeft,
  Banknote,
  Bell,
  CameraIcon,
  CircleDollarSign,
  ClipboardListIcon,
  Coins,
  DatabaseIcon,
  FileChartColumn,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  Fingerprint,
  HandCoins,
  HomeIcon,
  Palette,
  ParkingMeter,
  PiggyBank,
  SettingsIcon,
  ShieldPlus,
  SquareUserRound,
  TentTree,
  Umbrella,
  UserRound,
} from "lucide-react";

import { NavSecondary } from "@/components/home/nav-secondary";
import { NavUser } from "@/components/home/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "safenest",
    email: "user1@safenest.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: HomeIcon,
      isDisabled: false,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: UserRound,
      isDisabled: true,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileChartColumn,
      isDisabled: true,
    },
    {
      title: "Insights",
      url: "/insights",
      icon: CircleDollarSign,
      isDisabled: false,
    },
  ],
  navSecondary: [
    {
      title: "Spending",
      url: "/spending",
      icon: Coins,
      isDisabled: true,
    },
    {
      title: "Budget & Goals",
      url: "/goals",
      icon: Banknote,
      isDisabled: true,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowRightLeft,
      isDisabled: false,
    },
  ],
  navTertiary: [
    {
      title: "Debts",
      url: "/debts",
      icon: HandCoins,
      isDisabled: false,
    },
    {
      title: "Investments",
      url: "/investments",
      icon: PiggyBank,
      isDisabled: true,
    },
    {
      title: "Retirement",
      url: "/retirement",
      icon: TentTree,
      isDisabled: true,
    },

    {
      title: "Taxes",
      url: "/taxes",
      icon: ParkingMeter,
      isDisabled: true,
    },
    {
      title: "Insurances",
      url: "/insurances",
      icon: Umbrella,
      isDisabled: true,
    },
  ],
  navProfile: [
    {
      title: "Profile",
      url: "/profile",
      icon: Fingerprint,
      isDisabled: false,
    },
    {
      title: "Account",
      url: "/profile/account",
      icon: SquareUserRound,
      isDisabled: false,
    },
    {
      title: "Appearance",
      url: "/profile/appearance",
      icon: Palette,
      isDisabled: true,
    },

    {
      title: "Notifications",
      url: "/profile/notifications",
      icon: Bell,
      isDisabled: true,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navUtilities: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
      isDisabled: true,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/login") {
    return <></>;
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/home">
                <ShieldPlus className="h-5 w-5" />
                <span className="text-base font-semibold">SafeNest</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Conditional nav sections */}
        {!pathname.startsWith("/profile") ? (
          <>
            <NavSecondary items={data.navMain} />
            <NavSecondary items={data.navSecondary} />
            <NavSecondary items={data.navTertiary} />
          </>
        ) : (
          <NavSecondary items={data.navProfile} />
        )}

        {/* Footer nav always shown */}
        <NavSecondary items={data.navUtilities} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
