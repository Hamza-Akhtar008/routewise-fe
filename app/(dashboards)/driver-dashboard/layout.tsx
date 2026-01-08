import { Toaster } from "sonner";
import React from "react";
import { DriverDashboardLayout } from "@/components/driverComponents/DriverLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DriverDashboardLayout>
      <Toaster richColors position="top-right" />
      {children}
    </DriverDashboardLayout>
  );
}
