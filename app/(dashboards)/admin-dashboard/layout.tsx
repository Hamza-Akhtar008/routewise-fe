import { Toaster } from "sonner";
import React from "react";
import { AdminDashboardLayout } from "../../../components/AdminComponents/AdminLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDashboardLayout>
      <Toaster richColors position="top-right" />
      {children}
    </AdminDashboardLayout>
  );
}
