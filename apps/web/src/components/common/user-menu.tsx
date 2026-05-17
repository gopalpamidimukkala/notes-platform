import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

export function UserMenu() {
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);

  const logoutUser = useAuthStore((state) => state.logout);

  const logout = () => {
    logoutUser();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-semibold text-primary-foreground shadow-lg">
            U
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl border border-border/50 bg-card/80 p-2 backdrop-blur-xl"
      >
        <div className="mb-2 border-b border-border/50 px-3 py-2">
          <p className="text-sm font-medium">Logged in</p>

          <p className="text-xs text-muted-foreground">
            {accessToken ? "Authenticated User" : "Guest"}
          </p>
        </div>

        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer rounded-xl text-red-500 transition-colors focus:bg-red-500/10 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
