

import {LayoutSideContent, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    {icon: House, href: "/dashboard/lawyer", label: "Home"},
    {icon: Magnifier, href: "/dashboard/lawyer/cases", label: "Cases"},
    {icon: Bell, href: "/dashboard/lawyer/cases/new", label: "Post a case"},
    {icon: Briefcase, href: "/dashboard/lawyer/lawfirm", label: "Lawfirm"},

    {icon: Envelope, href: "/messages", label: "Messages"},
    {icon: Person, href: "/profile", label: "Profile"},
    {icon: Gear, href: "/settings", label: "Settings"},
  ];
  const navContent =  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>

  return (
    
   <>
   <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-6 rounded-xl border   p-4">
      {navContent}
    </aside>
    <Drawer >
      <Button className="lg:hidden" variant="secondary">
        <LayoutSideContent />
        Side bar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
   </>
  );
}