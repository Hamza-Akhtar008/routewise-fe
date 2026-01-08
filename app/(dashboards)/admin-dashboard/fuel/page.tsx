"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Fuel, TrendingUp, TrendingDown } from "lucide-react";

const fuelData = [
  { id: 1, vehicle: "Truck #101", date: "Jan 7", volume: "45.2 gal", cost: "$180.50", location: "Shell Station #42" },
  { id: 2, vehicle: "Van #205", date: "Jan 7", volume: "18.5 gal", cost: "$72.15", location: "BP Express" },
  { id: 3, vehicle: "Truck #104", date: "Jan 6", volume: "52.0 gal", cost: "$210.80", location: "Pilot Travel Center" },
  { id: 4, vehicle: "Truck #101", date: "Jan 4", volume: "42.1 gal", cost: "$168.40", location: "Shell Station #42" },
];

export default function FuelPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fuel Tracks</h2>
          <p className="text-muted-foreground">Monitor fuel consumption and expenses.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost (Jan)</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250.00</div>
            <p className="text-xs text-muted-foreground flex items-center text-red-500">
               <TrendingUp className="mr-1 h-3 w-3" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price / Gal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3.95</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-500">
               <TrendingDown className="mr-1 h-3 w-3" /> -2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Fuel Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fuelData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-medium">{item.vehicle}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right font-medium">{item.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
