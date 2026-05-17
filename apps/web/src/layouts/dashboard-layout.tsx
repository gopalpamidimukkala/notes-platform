import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/common/command-palette";
import { UserMenu } from "@/components/common/user-menu";
import { ThemeToggle } from "@/components/common/theme-toggle";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}

      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Section */}

      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}

        <div className="flex items-center border-b border-border px-4 py-3 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <h1 className="ml-3 text-lg font-semibold">MemoStack</h1>
        </div>

        <header className="flex items-center justify-between border-b border-border/50 px-6 py-4 backdrop-blur-xl">
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <UserMenu />
          </div>
        </header>
        {/* Page Content */}

        <main className="flex-1">
          <Outlet />
        </main>
        <CommandPalette />
      </div>
    </div>
  );
}
