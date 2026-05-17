import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/layouts/root-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { ProtectedRoute } from "@/components/common/protected-route";
import { NoteEditorPage } from "@/pages/note-editor-page";
import { SharedNotePage } from "@/pages/shared-note-page";
import { FavoritesPage } from "@/pages/favorites-page";
import { ArchivedPage } from "@/pages/archived-page";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <RootLayout />,

    children: [
      {
        index: true,

        element: <HomePage />,
      },

      {
        path: "login",

        element: <LoginPage />,
      },

      {
        path: "register",

        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,

        element: <DashboardPage />,
      },

      {
        path: "notes/:id",

        element: <NoteEditorPage />,
      },

      {
        path: "favorites",

        element: <FavoritesPage />,
      },

      {
        path: "archived",

        element: <ArchivedPage />,
      },
    ],
  },

  {
    path: "/shared/:shareId",

    element: <SharedNotePage />,
  },
]);
