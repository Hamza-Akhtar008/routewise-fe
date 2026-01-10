"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Calendar, Car, Clock, Edit, Eye, FileText, Filter, MapPin, MoreVertical, Plus, RefreshCw, Search, ShieldAlert, Trash, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Sample accident stats
const accidentStats = {
    totalReports: 12,
    openCases: 4,
    closedCases: 8,
};

// Mock data for accidents
interface AccidentReport {
    id: string;
    driver: { name: string; avatar: string };
    date: string;
    time: string;
    location: string;
    vehicle: string;
    description: string;
    otherParty: {
        name: string;
        phone: string;
        email: string;
        licensePlate: string;
        insuranceInfo: string;
    };
    policeReportNumber: string;
    status: "Open" | "Under Investigation" | "Closed";
}

const accidentsData: AccidentReport[] = [
    {
        id: "1",
        driver: { name: "John Smith", avatar: "" },
        date: "Jan 10, 2026",
        time: "09:30 AM",
        location: "123 Main St, Downtown",
        vehicle: "Truck #101",
        description: "Minor fender bender at intersection. No injuries reported.",
        otherParty: {
            name: "Jane Doe",
            phone: "(555) 123-4567",
            email: "jane.doe@email.com",
            licensePlate: "ABC-1234",
            insuranceInfo: "State Farm, Policy #12345",
        },
        policeReportNumber: "PR-2026-001",
        status: "Closed",
    },
    {
        id: "2",
        driver: { name: "Sarah Johnson", avatar: "" },
        date: "Jan 8, 2026",
        time: "02:15 PM",
        location: "456 Oak Avenue, Industrial Zone",
        vehicle: "Van #203",
        description: "Side mirror damaged while backing out of loading dock.",
        otherParty: {
            name: "",
            phone: "",
            email: "",
            licensePlate: "",
            insuranceInfo: "",
        },
        policeReportNumber: "",
        status: "Closed",
    },
    {
        id: "3",
        driver: { name: "Mike Wilson", avatar: "" },
        date: "Jan 5, 2026",
        time: "11:45 AM",
        location: "789 Highway 101, North Exit",
        vehicle: "Truck #105",
        description: "Rear-ended by another vehicle at red light. Awaiting insurance claim.",
        otherParty: {
            name: "Robert Brown",
            phone: "(555) 987-6543",
            email: "r.brown@email.com",
            licensePlate: "XYZ-5678",
            insuranceInfo: "Allstate, Policy #67890",
        },
        policeReportNumber: "PR-2026-002",
        status: "Under Investigation",
    },
    {
        id: "4",
        driver: { name: "Emily Davis", avatar: "" },
        date: "Jan 3, 2026",
        time: "04:20 PM",
        location: "321 Elm Street, Residential Area",
        vehicle: "Van #207",
        description: "Scratched parked car while navigating narrow street.",
        otherParty: {
            name: "Lisa Garcia",
            phone: "(555) 456-7890",
            email: "l.garcia@email.com",
            licensePlate: "DEF-9012",
            insuranceInfo: "Progressive, Policy #11111",
        },
        policeReportNumber: "",
        status: "Open",
    },
    {
        id: "5",
        driver: { name: "Robert Brown", avatar: "" },
        date: "Dec 28, 2025",
        time: "08:00 AM",
        location: "555 Commerce Blvd, Warehouse District",
        vehicle: "Truck #102",
        description: "Flat tire caused vehicle to drift into barrier. No other vehicles involved.",
        otherParty: {
            name: "",
            phone: "",
            email: "",
            licensePlate: "",
            insuranceInfo: "",
        },
        policeReportNumber: "PR-2025-089",
        status: "Closed",
    },
    {
        id: "6",
        driver: { name: "Lisa Garcia", avatar: "" },
        date: "Dec 20, 2025",
        time: "01:30 PM",
        location: "888 Airport Road",
        vehicle: "Van #210",
        description: "Minor collision in parking lot. Both parties exchanged information.",
        otherParty: {
            name: "Michael Chen",
            phone: "(555) 234-5678",
            email: "m.chen@email.com",
            licensePlate: "GHI-3456",
            insuranceInfo: "GEICO, Policy #22222",
        },
        policeReportNumber: "",
        status: "Open",
    },
];

export default function AccidentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter accidents based on search
    const filteredAccidents = accidentsData.filter((accident) =>
        accident.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accident.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accident.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Accidents</h2>
                        <p className="text-muted-foreground">Track and manage accident reports</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Report Accident
                    </Button>
                </div>

                {/* Stats Cards */}
            

                {/* Accidents Table Section */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Accident Reports</CardTitle>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search accidents..."
                                        className="w-full pl-8 sm:w-[300px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                            <span className="sr-only">Filter</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Select>
                                                <SelectTrigger className="w-full border-none p-0 shadow-none">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    <SelectItem value="open">Open</SelectItem>
                                                    <SelectItem value="investigation">Under Investigation</SelectItem>
                                                    <SelectItem value="closed">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Button variant="outline" size="sm" className="w-full">
                                                <RefreshCw className="mr-2 h-3 w-3" />
                                                Reset Filters
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="list" className="w-full">
                            <TabsList className="mb-4 grid w-full grid-cols-2">
                                <TabsTrigger value="list">List View</TabsTrigger>
                                <TabsTrigger value="grid">Grid View</TabsTrigger>
                            </TabsList>
                            <TabsContent value="list" className="mt-0">
                                <div className="rounded-md border">
                                    <Table className="whitespace-nowrap">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Driver</TableHead>
                                                <TableHead className="hidden md:table-cell">Location</TableHead>
                                                <TableHead className="hidden md:table-cell">Vehicle</TableHead>
                                                <TableHead className="hidden lg:table-cell">Description</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="whitespace-nowrap">
                                            {filteredAccidents.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <AlertTriangle className="h-10 w-10 mb-2" />
                                                            <p>No accident reports found</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredAccidents.map((accident) => (
                                                    <TableRow key={accident.id}>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{accident.date}</span>
                                                                <span className="text-xs text-muted-foreground">{accident.time}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={accident.driver.avatar || "/user-2.png"} alt={accident.driver.name} />
                                                                    <AvatarFallback>{accident.driver.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <span>{accident.driver.name}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            <span className="text-muted-foreground line-clamp-1 max-w-[200px]">
                                                                {accident.location}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">{accident.vehicle}</TableCell>
                                                        <TableCell className="hidden lg:table-cell">
                                                            <span className="text-muted-foreground line-clamp-1 max-w-[250px]">
                                                                {accident.description}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    accident.status === "Closed"
                                                                        ? "success"
                                                                        : accident.status === "Open"
                                                                            ? "destructive"
                                                                            : "warning"
                                                                }
                                                            >
                                                                {accident.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreVertical className="h-4 w-4" />
                                                                        <span className="sr-only">Actions</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={`/admin-dashboard/accidents/${accident.id}`}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={`/admin-dashboard/accidents/${accident.id}/edit`}>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() => setDeleteDialogOpen(true)}
                                                                        className="text-red-500"
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        Showing <strong>1-{filteredAccidents.length}</strong> of <strong>{accidentsData.length}</strong> reports
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" disabled>
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="grid" className="mt-0">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredAccidents.map((accident) => (
                                        <Card key={accident.id} className="overflow-hidden">
                                            <CardContent className="!p-0">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center justify-between bg-muted p-2 lg:p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                                                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{accident.driver.name}</div>
                                                                <div className="text-xs text-muted-foreground">{accident.date} • {accident.time}</div>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                accident.status === "Closed"
                                                                    ? "success"
                                                                    : accident.status === "Open"
                                                                        ? "destructive"
                                                                        : "warning"
                                                            }
                                                        >
                                                            {accident.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="grid gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm line-clamp-1">{accident.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Car className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">{accident.vehicle}</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                                {accident.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex border-t">
                                                        <Button asChild variant="ghost" className="flex-1 rounded-none rounded-bl-md py-2">
                                                            <Link href={`/admin-dashboard/accidents/${accident.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </Button>
                                                        <Button asChild variant="ghost" className="flex-1 rounded-none rounded-br-md border-l py-2">
                                                            <Link href={`/admin-dashboard/accidents/${accident.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        Showing <strong>1-{filteredAccidents.length}</strong> of <strong>{accidentsData.length}</strong> reports
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" disabled>
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this report?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will permanently delete the accident report from the system. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => setDeleteDialogOpen(false)} className="bg-red-500 text-neutral-50 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
