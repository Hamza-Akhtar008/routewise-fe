"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Phone, MapPin, AlertTriangle } from "lucide-react";

export default function TowServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tow Service</h2>
          <p className="text-muted-foreground">Manage towing requests and vehicle recovery.</p>
        </div>
        <Button variant="destructive">
          <AlertTriangle className="mr-2 h-4 w-4" /> Request Tow
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2].map((i) => (
            <Card key={i} className="border-l-4 border-l-red-500">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Truck className="h-5 w-5 text-red-500" />
                            Incident #{202400 + i}
                        </CardTitle>
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">Dispatched</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                             <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                             <span>
                                <strong>Location:</strong><br/>
                                I-95 South, Mile Marker 42
                             </span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Truck className="h-4 w-4 text-muted-foreground" />
                             <span>Unit #104 - Engine Failure</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                            <Phone className="mr-2 h-3 w-3" /> Contact Driver
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                            Track Tow
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
