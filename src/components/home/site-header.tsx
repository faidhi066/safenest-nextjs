import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({
  title,
  navItems,
}: {
  title: string;
  navItems: string[];
}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <nav className="ml-10 flex items-center gap-5 text-xs">
          {navItems.map((navItem, i) => (
            <a
              href="#"
              className="text-muted-foreground pointer-events-none cursor-not-allowed"
              key={i}
            >
              {navItem}
            </a>
          ))}

          {/* <a
            href="#"
            className="text-muted-foreground pointer-events-none cursor-not-allowed"
          >
            Smart Analysis
          </a>
          <a
            href="#"
            className="text-muted-foreground pointer-events-none cursor-not-allowed"
          >
            Payoff Planner
          </a>
          <a
            href="#"
            className="text-muted-foreground pointer-events-none cursor-not-allowed"
          >
            All Debts
          </a> */}
        </nav>
      </div>
    </header>
  );
}
