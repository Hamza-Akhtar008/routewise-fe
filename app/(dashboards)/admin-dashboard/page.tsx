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
        {/* Active Drivers */}
        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <Users className="h-6 w-6 text-green-600" />
            <CardTitle className="text-base font-semibold text-foreground">Active Drivers</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold text-foreground">+2,350</h3>
          </CardContent>
        </Card>

        {/* Active Routes */}
        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <MapPin className="h-6 w-6 text-[#3b82f6]" />
            <CardTitle className="text-base font-semibold text-foreground">Active Routes</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-[#3b82f6]">+4.3%</span> from last month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold text-foreground">+12,234</h3>
          </CardContent>
        </Card>

        {/* Today's Runs */}
        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <Calendar className="h-6 w-6 text-[#e4940b]" />
            <CardTitle className="text-base font-semibold text-foreground">Today's Runs</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-[#e4940b]">+10.1%</span> from yesterday
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold text-foreground">+12,234</h3>
          </CardContent>
        </Card>

        {/* Weekly Fuel Cost */}
        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <Fuel className="h-6 w-6 text-[#a855f7]" />
            <CardTitle className="text-base font-semibold text-foreground">Weekly Fuel Cost</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-[#a855f7]">-2.4%</span> from last week
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold text-foreground">$45,231.89</h3>
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
