"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, AlertCircle, CheckCircle2, CalendarClock } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance</h2>
          <p className="text-muted-foreground">Vehicle service schedules and repairs.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Wrench className="mr-2 h-4 w-4" /> Log Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800 dark:text-red-300">Critical Issues</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">2</div>
            <p className="text-xs text-red-700 dark:text-red-400">Vehicles offline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Service</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed (Jan)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Services performed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Maintenance Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                        {i === 1 ? 'Truck #104 - Engine Overheat' : i === 2 ? 'Van #205 - Brake Inspection' : 'Truck #101 - Oil Change'}
                        <Badge variant="outline">{i === 1 ? 'Critical' : i === 2 ? 'Routine' : 'Scheduled'}</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Reported by: {i === 1 ? 'John Smith' : 'System Schedule'} • 2 days ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                    <Badge variant={i === 1 ? 'destructive' : 'secondary'} className={i === 1 ? 'bg-red-500 hover:bg-red-600' : ''}>
                        {i === 1 ? 'In Shop' : 'Pending'}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">ETA: {i === 1 ? 'Tomorrow' : 'Jan 15'}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
