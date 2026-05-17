import { FileText, Star, Archive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sticky top-0 h-screen w-72 border-r border-border/50 bg-card/30 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="border-b border-border/50 p-6">
          <h2 className="text-xl font-bold">MemoStack</h2>
        </div>

        <div className="space-y-2 p-4">
          <Button
            asChild
            variant={location.pathname === "/dashboard" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <Link to="/dashboard" className="flex items-center">
              <FileText className="h-4 w-4" />
              All Notes
            </Link>
          </Button>

          <Button
            asChild
            variant={
              location.pathname === "/dashboard/favorites" ? "default" : "ghost"
            }
            className="w-full justify-start gap-2"
          >
            <Link to="/dashboard/favorites" className="flex items-center">
              <Star className="h-4 w-4" />
              Favorites
            </Link>
          </Button>

          <Button
            asChild
            variant={
              location.pathname === "/dashboard/archived" ? "default" : "ghost"
            }
            className="w-full justify-start gap-2"
          >
            <Link to="/dashboard/archived" className="flex items-center">
              <Archive className="h-4 w-4" />
              Archived
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
