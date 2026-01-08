"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Palmtree, Plus, CheckCircle2, XCircle, Clock } from "lucide-react";

const requests = [
  { id: 1, employee: "John Smith", type: "Vacation", dates: "Feb 10 - Feb 15", days: 5, status: "Pending", submitted: "Jan 5" },
  { id: 2, employee: "Sarah Johnson", type: "Sick Leave", dates: "Jan 2", days: 1, status: "Approved", submitted: "Jan 2" },
  { id: 3, employee: "Mike Davis", type: "Personal", dates: "Jan 20", days: 1, status: "Rejected", submitted: "Jan 3" },
];

export default function PTOPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Paid Time Off</h2>
          <p className="text-muted-foreground">Manage employee leave requests and balances.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-300">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">4</div>
            <p className="text-xs text-purple-700 dark:text-purple-400">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">On Leave Today</CardTitle>
            <Palmtree className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">2</div>
            <p className="text-xs text-green-700 dark:text-green-400">Employees absent</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employee}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.dates}</TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === "Approved" ? "default" : request.status === "Rejected" ? "destructive" : "secondary"}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {request.status === "Pending" && (
                        <>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                            <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle className="h-4 w-4" />
                        </Button>
                        </>
                    )}
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
