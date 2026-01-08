"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Navigation, Clock, Activity } from "lucide-react";

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Active Routes</h2>
          <p className="text-muted-foreground">Monitor live route progress and status.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Map className="mr-2 h-4 w-4" /> Optimize Routes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
             <Card className="h-[600px] flex items-center justify-center bg-muted/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
                <div className="text-center z-10">
                    <Navigation className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-pulse" />
                    <p className="text-lg font-medium">Live Map View</p>
                    <p className="text-sm text-muted-foreground">Map integration would render here.</p>
                </div>
            </Card>
        </div>
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                             <CardTitle className="text-base">Route #{100+i} - {i === 1 ? 'Downtown' : i === 2 ? 'Suburban' : 'Industrial'}</CardTitle>
                             <Badge variant={i === 1 ? 'default' : 'secondary'} className={i === 1 ? 'bg-green-500' : ''}>
                                {i === 1 ? 'Active' : 'Pending'}
                             </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ETA</span>
                                <span>12:30 PM</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Progress</span>
                                <span>65%</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-2">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${65 - (i*10)}%` }} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
