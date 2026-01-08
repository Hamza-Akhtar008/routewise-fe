"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Calendar, Fuel, ArrowRight, Clock, Truck } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// Mock data for Today's Schedule
const todaySchedule = [
  {
    id: 1,
    routeName: "Downtown Delivery Route",
    driver: "John Smith",
    startTime: "08:00 AM",
    endTime: "12:00 PM",
    stops: 12,
    status: "in-progress",
  },
  {
    id: 2,
    routeName: "Suburban Express",
    driver: "Sarah Johnson",
    startTime: "09:30 AM",
    endTime: "02:30 PM",
    stops: 8,
    status: "scheduled",
  },
  {
    id: 3,
    routeName: "Industrial Zone Run",
    driver: "Mike Davis",
    startTime: "01:00 PM",
    endTime: "05:00 PM",
    stops: 6,
    status: "scheduled",
  },
];

// Mock data for Recent Fuel Receipts
const recentFuelReceipts = [
  {
    id: 1,
    driver: "John Smith",
    vehicle: "Truck #101",
    date: "Jan 7, 2026",
    amount: 85.50,
    gallons: 22.5,
  },
  {
    id: 2,
    driver: "Sarah Johnson",
    vehicle: "Van #205",
    date: "Jan 6, 2026",
    amount: 62.30,
    gallons: 16.4,
  },
  {
    id: 3,
    driver: "Mike Davis",
    vehicle: "Truck #103",
    date: "Jan 5, 2026",
    amount: 94.20,
    gallons: 24.8,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h2>
        <p className="text-muted-foreground font-mono text-sm">Welcome back! Here's your fleet overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-background shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Active Drivers</span>
              <span className="text-3xl font-bold">3</span>
            </div>
            <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-mono">3 total</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-background shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Active Routes</span>
              <span className="text-3xl font-bold">3</span>
            </div>
            <div className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <MapPin className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-mono">3 total</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-background shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Today's Runs</span>
              <span className="text-3xl font-bold">3</span>
            </div>
            <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
              <Calendar className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-mono">1 in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-background shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Weekly Fuel Cost</span>
              <span className="text-3xl font-bold">$242.00</span>
            </div>
            <div className="h-10 w-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <Fuel className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-mono">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
        {/* Today's Schedule */}
        <Card className="md:col-span-2 lg:col-span-5">
          <CardHeader className="flex flex-row items-center justify-between border-b p-6">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold">Today's Schedule</CardTitle>
              <p className="text-sm text-muted-foreground font-mono">{format(new Date(), "EEEE, MMMM d")}</p>
            </div>
            <Link href="/schedule" className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 font-mono">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {todaySchedule.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Truck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{schedule.routeName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{schedule.driver}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <Clock className="h-3 w-3" />
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{schedule.stops} stops</p>
                    </div>
                    <Badge
                      variant={schedule.status === "in-progress" ? "default" : "secondary"}
                      className={schedule.status === "in-progress" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {schedule.status === "in-progress" ? "In Progress" : "Scheduled"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Fuel Receipts */}
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader className="border-b p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Recent Fuel Receipts</CardTitle>
              <Link href="/fuel" className="text-xs font-medium text-orange-500 hover:text-orange-600 font-mono">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentFuelReceipts.map((receipt) => (
                <div key={receipt.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <Fuel className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{receipt.driver}</p>
                        <p className="text-xs text-muted-foreground font-mono">{receipt.vehicle}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-600">${receipt.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono pl-10">
                    <span>{receipt.date}</span>
                    <span>{receipt.gallons} gal</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
