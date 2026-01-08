"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Banknote, Download, FileText } from "lucide-react";

const payrolls = [
  { id: 1, period: "Jan 1 - Jan 15, 2026", payDate: "Jan 15", total: "$12,450.00", employees: 12, status: "Pending" },
  { id: 2, period: "Dec 16 - Dec 31, 2025", payDate: "Dec 31", total: "$11,980.00", employees: 12, status: "Paid" },
  { id: 3, period: "Dec 1 - Dec 15, 2025", payDate: "Dec 15", total: "$12,100.00", employees: 11, status: "Paid" },
];

export default function PayrollsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payrolls</h2>
          <p className="text-muted-foreground">Manage employee compensation and pay stubs.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Banknote className="mr-2 h-4 w-4" /> Run Payroll
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Pay Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">{payroll.period}</TableCell>
                  <TableCell>{payroll.payDate}</TableCell>
                  <TableCell>{payroll.total}</TableCell>
                  <TableCell>{payroll.employees}</TableCell>
                  <TableCell>
                    <Badge variant={payroll.status === "Paid" ? "secondary" : "default"} className={payroll.status === "Pending" ? "bg-amber-500 hover:bg-amber-600" : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"}>
                      {payroll.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
