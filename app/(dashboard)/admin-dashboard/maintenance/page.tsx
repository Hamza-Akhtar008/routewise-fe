"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Calendar, Car, Clock, DollarSign, Download, Edit, Filter, MoreHorizontal, Plus, RefreshCw, Search, Trash2, Truck, Wrench } from "lucide-react";
import { useState } from "react";

// Sample vehicles data
const vehicles: Vehicle[] = [
    {
        id: "1",
        vehicleNumber: "VH-001",
        makeModel: "Ford F-150",
        year: "2022",
        licensePlate: "ABC-1234",
        mileage: 45000,
        status: "Active",
    },
    {
        id: "2",
        vehicleNumber: "VH-002",
        makeModel: "Chevrolet Silverado",
        year: "2021",
        licensePlate: "XYZ-5678",
        mileage: 62000,
        status: "Active",
    },
    {
        id: "3",
        vehicleNumber: "VH-003",
        makeModel: "RAM 1500",
        year: "2023",
        licensePlate: "DEF-9012",
        mileage: 28000,
        status: "In Service",
    },
];

// Sample service schedules data
const serviceSchedules: ServiceSchedule[] = [
    {
        id: "1",
        vehicleNumber: "VH-001",
        serviceType: "Oil Change",
        interval: "Every 5,000 mi",
        lastService: "Dec 15, 2025",
        nextDue: "Jan 15, 2026",
        status: "Upcoming",
    },
    {
        id: "2",
        vehicleNumber: "VH-002",
        serviceType: "Tire Rotation",
        interval: "Every 7,500 mi",
        lastService: "Nov 20, 2025",
        nextDue: "Jan 5, 2026",
        status: "Overdue",
    },
    {
        id: "3",
        vehicleNumber: "VH-003",
        serviceType: "Brake Inspection",
        interval: "Every 15,000 mi",
        lastService: "Oct 10, 2025",
        nextDue: "Feb 10, 2026",
        status: "Upcoming",
    },
];

// Sample maintenance logs data
const maintenanceLogs: MaintenanceLog[] = [
    {
        id: "1",
        date: "Jan 5, 2026",
        vehicleNumber: "VH-001",
        serviceType: "Oil Change",
        vendor: "Quick Lube",
        mileage: 44500,
        cost: 85.00,
    },
    {
        id: "2",
        date: "Dec 28, 2025",
        vehicleNumber: "VH-002",
        serviceType: "Tire Replacement",
        vendor: "Tire Kingdom",
        mileage: 61000,
        cost: 650.00,
    },
    {
        id: "3",
        date: "Dec 20, 2025",
        vehicleNumber: "VH-003",
        serviceType: "Battery Replacement",
        vendor: "AutoZone",
        mileage: 27500,
        cost: 180.00,
    },
];

interface Vehicle {
    id: string;
    vehicleNumber: string;
    makeModel: string;
    year: string;
    licensePlate: string;
    mileage: number;
    status: "Active" | "In Service" | "Out of Service";
}

interface ServiceSchedule {
    id: string;
    vehicleNumber: string;
    serviceType: string;
    interval: string;
    lastService: string;
    nextDue: string;
    status: "Upcoming" | "Overdue" | "Completed";
}

interface MaintenanceLog {
    id: string;
    date: string;
    vehicleNumber: string;
    serviceType: string;
    vendor: string;
    mileage: number;
    cost: number;
}

export default function MaintenancePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("vehicles");

    // Modal form state
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [makeModel, setMakeModel] = useState("");
    const [year, setYear] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [mileage, setMileage] = useState("");
    const [status, setStatus] = useState("");

    // Stats calculations
    const activeVehicles = vehicles.filter(v => v.status === "Active").length;
    const overdueServices = serviceSchedules.filter(s => s.status === "Overdue").length;
    const dueSoon = serviceSchedules.filter(s => s.status === "Upcoming").length;
    const totalMaintenanceCost = maintenanceLogs.reduce((acc, log) => acc + log.cost, 0);

    // Handle form submission
    const handleSubmit = () => {
        if (!vehicleNumber || !makeModel || !year) return;

        console.log("Vehicle submitted:", {
            vehicleNumber,
            makeModel,
            year,
            licensePlate,
            mileage: parseInt(mileage) || 0,
            status,
        });

        // Reset form and close modal
        setVehicleNumber("");
        setMakeModel("");
        setYear("");
        setLicensePlate("");
        setMileage("");
        setStatus("");
        setIsModalOpen(false);
    };

    const isFormValid = vehicleNumber && makeModel && year;

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Vehicle Maintenance</h2>
                    <p className="text-muted-foreground">Manage vehicles and maintenance schedules</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {activeTab === "vehicles" && "Add Vehicle"}
                    {activeTab === "schedules" && "Add Schedule"}
                    {activeTab === "logs" && "Log Maintenance"}
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
                        <Car className="size-8 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeVehicles}</div>
                        <p className="text-xs text-muted-foreground">Vehicles in active service</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overdue Services</CardTitle>
                        <AlertTriangle className="size-8 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overdueServices}</div>
                        <p className="text-xs text-muted-foreground">Services past due date</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
                        <Clock className="size-8 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dueSoon}</div>
                        <p className="text-xs text-muted-foreground">Upcoming maintenance</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                        <DollarSign className="size-8 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalMaintenanceCost.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total maintenance expenses</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-auto">
                    <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                    <TabsTrigger value="schedules">Service Schedules</TabsTrigger>
                    <TabsTrigger value="logs">Maintenance Logs</TabsTrigger>
                </TabsList>

                {/* Vehicles Tab */}
                <TabsContent value="vehicles" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Filters and Actions */}
                            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input type="search" placeholder="Search vehicles..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
                                    </div>

                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="rounded-md border">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium">Vehicle #</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Make/Model</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Year</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">License Plate</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Mileage</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {vehicles.length === 0 ? (
                                                <tr className="border-b transition-colors">
                                                    <td colSpan={7} className="p-4 align-middle h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <Truck className="h-10 w-10 mb-2" />
                                                            <p>No vehicles added yet</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                vehicles.map((vehicle) => (
                                                    <tr key={vehicle.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                        <td className="p-4 align-middle font-medium">{vehicle.vehicleNumber}</td>
                                                        <td className="p-4 align-middle">{vehicle.makeModel}</td>
                                                        <td className="p-4 align-middle">{vehicle.year}</td>
                                                        <td className="p-4 align-middle">{vehicle.licensePlate}</td>
                                                        <td className="p-4 align-middle">{vehicle.mileage.toLocaleString()}</td>
                                                        <td className="p-4 align-middle">
                                                            <Badge
                                                                variant={
                                                                    vehicle.status === "Active"
                                                                        ? "success"
                                                                        : vehicle.status === "In Service"
                                                                            ? "warning"
                                                                            : "destructive"
                                                                }
                                                            >
                                                                {vehicle.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4 text-right align-middle">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-500">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing <strong>1-{vehicles.length}</strong> of <strong>{vehicles.length}</strong> vehicles
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" disabled>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm" disabled>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Service Schedules Tab */}
                <TabsContent value="schedules" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Schedules</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Filters and Actions */}
                            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input type="search" placeholder="Search schedules..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
                                    </div>

                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="rounded-md border">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium">Vehicle</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Service Type</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Interval</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Last Service</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Next Due</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {serviceSchedules.length === 0 ? (
                                                <tr className="border-b transition-colors">
                                                    <td colSpan={7} className="p-4 align-middle h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <Calendar className="h-10 w-10 mb-2" />
                                                            <p>No maintenance schedules yet</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                serviceSchedules.map((schedule) => (
                                                    <tr key={schedule.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                        <td className="p-4 align-middle font-medium">{schedule.vehicleNumber}</td>
                                                        <td className="p-4 align-middle">{schedule.serviceType}</td>
                                                        <td className="p-4 align-middle">{schedule.interval}</td>
                                                        <td className="p-4 align-middle text-muted-foreground">{schedule.lastService}</td>
                                                        <td className="p-4 align-middle">{schedule.nextDue}</td>
                                                        <td className="p-4 align-middle">
                                                            <Badge
                                                                variant={
                                                                    schedule.status === "Completed"
                                                                        ? "success"
                                                                        : schedule.status === "Upcoming"
                                                                            ? "warning"
                                                                            : "destructive"
                                                                }
                                                            >
                                                                {schedule.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4 text-right align-middle">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-500">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing <strong>1-{serviceSchedules.length}</strong> of <strong>{serviceSchedules.length}</strong> schedules
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" disabled>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm" disabled>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Maintenance Logs Tab */}
                <TabsContent value="logs" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance Logs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Filters and Actions */}
                            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input type="search" placeholder="Search logs..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
                                    </div>

                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="rounded-md border">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Vehicle</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Service</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Vendor</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Mileage</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Cost</th>
                                                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {maintenanceLogs.length === 0 ? (
                                                <tr className="border-b transition-colors">
                                                    <td colSpan={7} className="p-4 align-middle h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <Wrench className="h-10 w-10 mb-2" />
                                                            <p>No maintenance logs yet</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                maintenanceLogs.map((log) => (
                                                    <tr key={log.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                        <td className="p-4 align-middle">{log.date}</td>
                                                        <td className="p-4 align-middle font-medium">{log.vehicleNumber}</td>
                                                        <td className="p-4 align-middle">{log.serviceType}</td>
                                                        <td className="p-4 align-middle">{log.vendor}</td>
                                                        <td className="p-4 align-middle">{log.mileage?.toLocaleString()}</td>
                                                        <td className="p-4 align-middle text-emerald-600 font-medium">${log.cost.toFixed(2)}</td>
                                                        <td className="p-4 text-right align-middle">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-500">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing <strong>1-{maintenanceLogs.length}</strong> of <strong>{maintenanceLogs.length}</strong> logs
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" disabled>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm" disabled>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add Vehicle Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="pb-2">
                        <DialogTitle>Add Vehicle</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-3">
                        {/* Vehicle Number */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="vehicleNumber" className="text-sm">
                                Vehicle # <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="vehicleNumber"
                                placeholder="e.g., VH-001"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                                className="h-9"
                            />
                        </div>

                        {/* Make/Model */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="makeModel" className="text-sm">
                                Make/Model <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="makeModel"
                                placeholder="e.g., Ford F-150"
                                value={makeModel}
                                onChange={(e) => setMakeModel(e.target.value)}
                                className="h-9"
                            />
                        </div>

                        {/* Year and License Plate Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                                <Label htmlFor="year" className="text-sm">
                                    Year <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="year"
                                    placeholder="e.g., 2024"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="licensePlate" className="text-sm">License Plate</Label>
                                <Input
                                    id="licensePlate"
                                    placeholder="e.g., ABC-1234"
                                    value={licensePlate}
                                    onChange={(e) => setLicensePlate(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Mileage and Status Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                                <Label htmlFor="mileage" className="text-sm">Mileage</Label>
                                <Input
                                    id="mileage"
                                    type="number"
                                    placeholder="e.g., 50000"
                                    value={mileage}
                                    onChange={(e) => setMileage(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="status" className="text-sm">Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger id="status" className="h-9">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="in-service">In Service</SelectItem>
                                        <SelectItem value="out-of-service">Out of Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={!isFormValid} className="flex-1">
                            Add Vehicle
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
