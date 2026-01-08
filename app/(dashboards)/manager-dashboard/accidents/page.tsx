"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, Camera } from "lucide-react";

const accidents = [
  { id: 1, vehicle: "Truck #101", driver: "John Smith", date: "Jan 5, 2026", type: "Minor Scrape", status: "Under Review" },
  { id: 2, vehicle: "Van #202", driver: "Mike Davis", date: "Dec 20, 2025", type: "Fender Bender", status: "Closed" },
];

export default function AccidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Accident Reports</h2>
          <p className="text-muted-foreground">Log and manage incident reports and claims.</p>
        </div>
        <Button variant="destructive">
          <AlertTriangle className="mr-2 h-4 w-4" /> Report Accident
        </Button>
      </div>

      <div className="grid gap-6">
        {accidents.map((accident) => (
            <Card key={accident.id}>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg flex items-center gap-2">
                             <AlertTriangle className={`h-5 w-5 ${accident.status === 'Closed' ? 'text-gray-400' : 'text-orange-500'}`} />
                             Incident #{202600 + accident.id} - {accident.type}
                        </CardTitle>
                        <Badge variant={accident.status === 'Closed' ? 'secondary' : 'default'} className={accident.status !== 'Closed' ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                            {accident.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                            <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Date:</span>
                                <span className="font-medium">{accident.date}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Vehicle:</span>
                                <span className="font-medium">{accident.vehicle}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b">
                                <span className="text-muted-foreground">Driver:</span>
                                <span className="font-medium">{accident.driver}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" /> View Full Report
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <Camera className="mr-2 h-4 w-4" /> View Photos (3)
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
