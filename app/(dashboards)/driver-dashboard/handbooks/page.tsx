"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download, Shield, FileText } from "lucide-react";

const handbooks = [
  { id: 1, title: "Employee Handbook 2026", description: "General company policies, code of conduct, and benefits.", size: "2.4 MB", type: "PDF", icon: BookOpen },
  { id: 2, title: "Driver Safety Manual", description: "Mandatory safety protocols for all fleet operators.", size: "5.1 MB", type: "PDF", icon: Shield },
  { id: 3, title: "IT Security Guidelines", description: "Best practices for data security and device usage.", size: "1.2 MB", type: "PDF", icon: FileText },
];

export default function HandbooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Handbooks & Resources</h2>
          <p className="text-muted-foreground">Access important company documentation.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {handbooks.map((book) => (
            <Card key={book.id} className="flex flex-col">
                <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                        <book.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>{book.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded uppercase text-[10px] tracking-wider font-bold">{book.type}</span>
                        <span>{book.size}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
