"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Users, UserPlus } from "lucide-react";

const drivers = [
  { id: 1, name: "John Smith", license: "CDL-A", status: "Active", rating: "4.8", trips: 142 },
  { id: 2, name: "Sarah Johnson", license: "CDL-B", status: "On Leave", rating: "4.9", trips: 89 },
  { id: 3, name: "Mike Davis", license: "CDL-A", status: "Active", rating: "4.7", trips: 215 },
  { id: 4, name: "Emily Wilson", license: "Class C", status: "Training", rating: "-", trips: 0 },
];

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Drivers</h2>
          <p className="text-muted-foreground">Manage driver roster and profiles.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <UserPlus className="mr-2 h-4 w-4" /> Add Driver
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Driver List</CardTitle>
            <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>License Class</TableHead>
                <TableHead>Total Trips</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                            {driver.name.charAt(0)}
                        </div>
                        {driver.name}
                    </div>
                  </TableCell>
                  <TableCell>{driver.license}</TableCell>
                  <TableCell>{driver.trips}</TableCell>
                  <TableCell>{driver.rating}</TableCell>
                  <TableCell>
                    <Badge variant={driver.status === "Active" ? "default" : "secondary"} className={driver.status === "Active" ? "bg-green-600" : ""}>
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm cursor-pointer hover:underline">
                    View Profile
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
