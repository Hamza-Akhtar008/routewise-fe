"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">Manage shifts and route timings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold px-2">January 2026</span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white">
            <CalendarIcon className="mr-2 h-4 w-4" /> New Shift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Upcoming Shifts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 items-start border-l-2 border-blue-500 pl-3">
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Route #{100 + i} - Downtown</p>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="h-3 w-3" /> 08:00 AM - 04:00 PM
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <MapPin className="h-3 w-3" /> Zone A
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-3">
            <Card className="h-[600px] flex items-center justify-center border-dashed">
                <CardContent className="text-center text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Calendar Component Placeholder</p>
                    <p className="text-sm">Interactive calendar would be integrated here.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
