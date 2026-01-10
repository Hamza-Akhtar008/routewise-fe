"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon, Check, CheckCircle, Clock, Download, Edit, Filter, MoreHorizontal, Plus, RefreshCw, Search, Trash2, Users, XCircle } from "lucide-react";
import { useState } from "react";

// Sample PTO balances data
const driverPTOBalances = [
    {
        id: "1",
        name: "Malik Arif",
        avatar: "",
        startDate: null,
        tenure: "N/A",
        annualPTO: 10,
        earned: 0,
        used: 0,
        available: 0,
    },
    {
        id: "2",
        name: "John Smith",
        avatar: "/user-3.png",
        startDate: "2023-03-15",
        tenure: "1.8 years",
        annualPTO: 15,
        earned: 12,
        used: 5,
        available: 7,
    },
    {
        id: "3",
        name: "Emily Davis",
        avatar: "/user-3.png",
        startDate: "2022-06-01",
        tenure: "2.5 years",
        annualPTO: 18,
        earned: 15,
        used: 8,
        available: 7,
    },
];

// Sample PTO requests data
const ptoRequests: PTORequest[] = [
    {
        id: "1",
        driver: {
            name: "John Smith",
            avatar: "/user-3.png",
        },
        startDate: "Jan 15, 2026",
        endDate: "Jan 17, 2026",
        days: 3,
        reason: "Family vacation",
        status: "Pending",
        requestedOn: "Jan 5, 2026",
    },
    {
        id: "2",
        driver: {
            name: "Emily Davis",
            avatar: "/user-3.png",
        },
        startDate: "Jan 20, 2026",
        endDate: "Jan 22, 2026",
        days: 3,
        reason: "Medical appointment",
        status: "Approved",
        requestedOn: "Jan 8, 2026",
    },
    {
        id: "3",
        driver: {
            name: "Malik Arif",
            avatar: "",
        },
        startDate: "Feb 1, 2026",
        endDate: "Feb 5, 2026",
        days: 5,
        reason: "Personal leave",
        status: "Pending",
        requestedOn: "Jan 9, 2026",
    },
    {
        id: "4",
        driver: {
            name: "John Smith",
            avatar: "/user-3.png",
        },
        startDate: "Dec 20, 2025",
        endDate: "Dec 24, 2025",
        days: 5,
        reason: "Holiday travel",
        status: "Rejected",
        requestedOn: "Dec 10, 2025",
    },
];

interface PTORequest {
    id: string;
    driver: {
        name: string;
        avatar: string;
    };
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    status: "Pending" | "Approved" | "Rejected";
    requestedOn: string;
}

// Sample drivers for the dropdown
const drivers = [
    { id: "1", name: "Malik Arif" },
    { id: "2", name: "John Smith" },
    { id: "3", name: "Emily Davis" },
];

export default function PTOPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState("");
    const [filterDriver, setFilterDriver] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");
    const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
    const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

    // Stats calculations
    const pendingRequests = ptoRequests.filter((r) => r.status === "Pending").length;
    const approvedThisYear = ptoRequests.filter((r) => r.status === "Approved").length;
    const activeDrivers = driverPTOBalances.length;

    const currentYear = new Date().getFullYear();

    // Calculate days between dates
    const calculateDays = () => {
        if (startDate && endDate) {
            return differenceInDays(endDate, startDate) + 1;
        }
        return 0;
    };

    // Handle form submission
    const handleSubmit = () => {
        if (!selectedDriver || !startDate || !endDate || !reason) return;

        console.log("PTO Request submitted:", {
            driver: selectedDriver,
            startDate,
            endDate,
            days: calculateDays(),
            reason,
            notes,
        });

        // Reset form and close modal
        setSelectedDriver("");
        setStartDate(undefined);
        setEndDate(undefined);
        setReason("");
        setNotes("");
        setIsModalOpen(false);
    };

    const isFormValid = selectedDriver && startDate && endDate && reason;

    // Filter PTO requests
    const filteredRequests = ptoRequests.filter((request) => {
        const driverMatch = filterDriver === "all" || request.driver.name === filterDriver;
        const statusMatch = filterStatus === "all" || request.status === filterStatus;
        return driverMatch && statusMatch;
    });

    return (
        <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">PTO Tracker</h2>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New PTO Request
                    </Button>
                </div>
                <p className="text-muted-foreground">Manage driver paid time off</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <Clock className="size-8 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingRequests}</div>
                        <p className="text-xs text-muted-foreground">Requests awaiting approval</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved This Year</CardTitle>
                        <CheckCircle className="size-8 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{approvedThisYear}</div>
                        <p className="text-xs text-muted-foreground">Total approved requests in {currentYear}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
                        <Users className="size-8 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeDrivers}</div>
                        <p className="text-xs text-muted-foreground">Drivers with PTO balance</p>
                    </CardContent>
                </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
                        <Users className="size-8 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeDrivers}</div>
                        <p className="text-xs text-muted-foreground">Registered drivers in system</p>
                    </CardContent>
                </Card>
            </div>

            {/* Driver PTO Balances Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Driver PTO Balances </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters and Actions for PTO Balances */}
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search drivers..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
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
                                        <th className="h-12 px-4 text-left align-middle font-medium">Driver</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Start Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Tenure</th>
                                        <th className="h-12 px-4 text-center align-middle font-medium">Annual PTO</th>
                                        <th className="h-12 px-4 text-center align-middle font-medium">Earned</th>
                                        <th className="h-12 px-4 text-center align-middle font-medium">Used</th>
                                        <th className="h-12 px-4 text-center align-middle font-medium">Available</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {driverPTOBalances.map((driver) => (
                                        <tr key={driver.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={driver.avatar || "/user-2.png"} alt={driver.name} />
                                                        <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="font-medium">{driver.name}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">{driver.startDate || "Not set"}</td>
                                            <td className="p-4 align-middle text-muted-foreground">{driver.tenure}</td>
                                            <td className="p-4 align-middle text-center">{driver.annualPTO} days</td>
                                            <td className="p-4 align-middle text-center">{driver.earned}</td>
                                            <td className="p-4 align-middle text-center">{driver.used}</td>
                                            <td className="p-4 align-middle text-center">
                                                <Badge variant={driver.available > 5 ? "success" : driver.available > 0 ? "warning" : "destructive"}>
                                                    {driver.available} days
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
                                                            Edit Balance
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            View History
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Remove Driver
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing <strong>1-{driverPTOBalances.length}</strong> of <strong>{driverPTOBalances.length}</strong> drivers
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

            {/* PTO Requests Section */}
            <Card>
                <CardHeader>
                    <CardTitle>PTO Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters and Actions */}
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search requests..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
                            </div>

                            <Select value={filterDriver} onValueChange={setFilterDriver}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="All Drivers" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Drivers</SelectItem>
                                    {drivers.map((driver) => (
                                        <SelectItem key={driver.id} value={driver.name}>
                                            {driver.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>

                            <Button variant="outline" size="icon">
                                <CalendarIcon className="h-4 w-4" />
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

                    {/* Tabs and PTO Requests Table */}
                    <Tabs defaultValue="all" className="w-full" onValueChange={setFilterStatus}>
                        <TabsList>
                            <TabsTrigger value="all">All Requests</TabsTrigger>
                            <TabsTrigger value="Pending">Pending</TabsTrigger>
                            <TabsTrigger value="Approved">Approved</TabsTrigger>
                            <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                        </TabsList>

                        <TabsContent value={filterStatus} className="space-y-4">
                            <div className="rounded-md border">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium">Driver</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Dates</th>
                                                <th className="h-12 px-4 text-center align-middle font-medium">Days</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Reason</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Requested On</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {filteredRequests.length === 0 ? (
                                                <tr className="border-b transition-colors">
                                                    <td colSpan={7} className="p-4 align-middle h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <CalendarIcon className="h-10 w-10 mb-2" />
                                                            <p>No PTO requests found</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredRequests.map((request) => (
                                                    <tr key={request.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                        <td className="p-4 align-middle">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={request.driver.avatar || "/user-2.png"} alt={request.driver.name} />
                                                                    <AvatarFallback>{request.driver.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div className="font-medium">{request.driver.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 align-middle">{request.startDate} - {request.endDate}</td>
                                                        <td className="p-4 align-middle text-center">{request.days}</td>
                                                        <td className="p-4 align-middle">{request.reason}</td>
                                                        <td className="p-4 align-middle text-muted-foreground">{request.requestedOn}</td>
                                                        <td className="p-4 align-middle">
                                                            <Badge
                                                                variant={
                                                                    request.status === "Approved"
                                                                        ? "success"
                                                                        : request.status === "Rejected"
                                                                            ? "destructive"
                                                                            : "warning"
                                                                }
                                                            >
                                                                {request.status}
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
                                                                    {request.status === "Pending" && (
                                                                        <>
                                                                            <DropdownMenuItem className="text-emerald-600">
                                                                                <Check className="mr-2 h-4 w-4" />
                                                                                Approve
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem className="text-red-600">
                                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                                Deny
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                        </>
                                                                    )}
                                                                    <DropdownMenuItem>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
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
                                    Showing <strong>1-{filteredRequests.length}</strong> of <strong>{filteredRequests.length}</strong> requests
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
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* New PTO Request Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New PTO Request</DialogTitle>
                        <DialogDescription>
                            Submit a new paid time off request for a driver.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Driver Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="driver">
                                Driver <span className="text-destructive">*</span>
                            </Label>
                            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                                <SelectTrigger id="driver">
                                    <SelectValue placeholder="Select driver" />
                                </SelectTrigger>
                                <SelectContent>
                                    {drivers.map((driver) => (
                                        <SelectItem key={driver.id} value={driver.id}>
                                            {driver.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Fields Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Start Date Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="startDate">
                                    Start Date <span className="text-destructive">*</span>
                                </Label>
                                <Popover open={isStartCalendarOpen} onOpenChange={setIsStartCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="startDate"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? format(startDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={(date) => {
                                                setStartDate(date);
                                                setIsStartCalendarOpen(false);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* End Date Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="endDate">
                                    End Date <span className="text-destructive">*</span>
                                </Label>
                                <Popover open={isEndCalendarOpen} onOpenChange={setIsEndCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="endDate"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? format(endDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={(date) => {
                                                setEndDate(date);
                                                setIsEndCalendarOpen(false);
                                            }}
                                            disabled={(date) => (startDate ? date < startDate : false)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Days Field (read-only) */}
                        <div className="grid gap-2">
                            <Label htmlFor="days">Days</Label>
                            <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm">
                                {startDate && endDate ? calculateDays() : 0}
                            </div>
                        </div>

                        {/* Reason Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="reason">Reason</Label>
                            <Select value={reason} onValueChange={setReason}>
                                <SelectTrigger id="reason">
                                    <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vacation">Vacation</SelectItem>
                                    <SelectItem value="sick">Sick Leave</SelectItem>
                                    <SelectItem value="personal">Personal Leave</SelectItem>
                                    <SelectItem value="family">Family Emergency</SelectItem>
                                    <SelectItem value="medical">Medical Appointment</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Notes Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Add any additional notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="resize-none"
                                rows={3}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={!isFormValid}>
                            Submit Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
