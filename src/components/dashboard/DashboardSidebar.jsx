

import { getUserSession } from "@/lib/core/session";
import { LayoutSideContent, Bell, Envelope, Gear, House, Magnifier, Person, CreditCard, CommentDot, PersonFill } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Bookmark, Briefcase, Building, FileText, LayoutDashboard, Scale, Search, SearchAlert, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {

  const user = await getUserSession()

  const lawyerNavLinks = [
    { icon: House, href: "/dashboard/lawyer", label: "Home" },
    { icon: Magnifier, href: "/dashboard/lawyer/cases", label: "Cases" },
    { icon: Bell, href: "/dashboard/lawyer/cases/new", label: "Post a case" },
    { icon: Briefcase, href: "/dashboard/lawyer/hiring-history", label: "Hiring History" },
    { icon: Envelope, href: "#", label: "Messages" },
    { icon: Person, href: "/dashboard/lawyer/manage-legal-profile", label: "Legal Profile" },
  ];


  const clientNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/user", label: "Dashboard" },
    { icon: SearchAlert, href: "/cases", label: "Browse Cases" },
    { icon: Bookmark, href: "/dashboard/user/saved-cases", label: "Saved Cases" },
    { icon: FileText, href: "/dashboard/user/hiring-history", label: "Hiring History" },
    { icon: PersonFill, href: "/dashboard/user/update-profile", label: "Update Profile" },
    { icon: CommentDot, href: "/dashboard/user/comments", label: "Comments" },
  ];

  const adminNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/manage-users", label: "Manage Users" },
    { icon: FileText, href: "/dashboard/admin/applications", label: "Applications" },
    { icon: CreditCard, href: "/plans", label: "Transactions" },
    { icon: ShieldCheck, href: "/dashboard/admin/analytics", label: "Analytics" },

  ]

  const navLinksMap = {
    client: clientNavLinks,
    lawyer: lawyerNavLinks,
    admin: adminNavLinks
  }

  console.log("user role:", user?.role)
  const navItems = navLinksMap[user?.role] || clientNavLinks

  const navContent = <nav className="flex flex-col gap-1">
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