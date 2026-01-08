"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Receipt, DollarSign, PieChart } from "lucide-react";

const expenses = [
  { id: 1, category: "Office Supplies", amount: "$150.25", date: "Jan 8, 2026", requester: "Admin", status: "Approved" },
  { id: 2, category: "Vehicle Registration", amount: "$450.00", date: "Jan 5, 2026", requester: "Manager", status: "Paid" },
  { id: 3, category: "Team Lunch", amount: "$85.00", date: "Jan 4, 2026", requester: "Sarah J.", status: "Pending" },
];

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">Track misc. operational costs and reimbursements.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses (Jan)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245.50</div>
            <p className="text-xs text-muted-foreground">Excluding fuel & payroll</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">$320.00 waiting</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
             <TableHeader>
                <TableRow>
                   <TableHead>Date</TableHead>
                   <TableHead>Category</TableHead>
                   <TableHead>Amount</TableHead>
                   <TableHead>Requester</TableHead>
                   <TableHead>Status</TableHead>
                </TableRow>
             </TableHeader>
             <TableBody>
                {expenses.map((ex) => (
                    <TableRow key={ex.id}>
                        <TableCell>{ex.date}</TableCell>
                        <TableCell className="font-medium">{ex.category}</TableCell>
                        <TableCell>{ex.amount}</TableCell>
                        <TableCell>{ex.requester}</TableCell>
                        <TableCell>
                            <Badge variant={ex.status === 'Approved' ? 'default' : ex.status === 'Paid' ? 'secondary' : 'outline'}>
                                {ex.status}
                            </Badge>
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
