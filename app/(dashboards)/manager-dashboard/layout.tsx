import { Toaster } from "sonner";
import React from "react";
import { ManagerDashboardLayout } from "../../../components/ManagerComponents/ManagerLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ManagerDashboardLayout>
      <Toaster richColors position="top-right" />
      {children}
    </ManagerDashboardLayout>
  );
}
