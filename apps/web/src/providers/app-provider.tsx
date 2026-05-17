import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}

        <Toaster richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
