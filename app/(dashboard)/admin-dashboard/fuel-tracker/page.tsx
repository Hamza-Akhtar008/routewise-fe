"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Camera, DollarSign, Download, Droplet, Edit, Eye, Filter, Fuel, MoreHorizontal, Plus, RefreshCw, Search, Trash2, TrendingUp, Upload } from "lucide-react";
import { useState } from "react";

// Sample fuel receipts data
const fuelReceipts = [
    {
        id: "1",
        date: "Jan 9, 2026",
        driver: {
            name: "Malik Arif",
            avatar: "",
        },
        amount: 70.00,
        gallons: 78.0,
        station: "shell",
        vehicle: "123",
        receipt: null,
    },
    {
        id: "2",
        date: "Jan 8, 2026",
        driver: {
            name: "John Smith",
            avatar: "/user-3.png",
        },
        amount: 55.50,
        gallons: 62.0,
        station: "Chevron",
        vehicle: "456",
        receipt: "receipt-001.pdf",
    },
    {
        id: "3",
        date: "Jan 7, 2026",
        driver: {
            name: "Emily Davis",
            avatar: "/user-3.png",
        },
        amount: 48.25,
        gallons: 53.5,
        station: "BP",
        vehicle: "789",
        receipt: "receipt-002.pdf",
    },
    {
        id: "4",
        date: "Jan 6, 2026",
        driver: {
            name: "Malik Arif",
            avatar: "",
        },
        amount: 65.00,
        gallons: 72.0,
        station: "Exxon",
        vehicle: "123",
        receipt: null,
    },
];

// Sample drivers for the dropdown
const drivers = [
    { id: "1", name: "Malik Arif" },
    { id: "2", name: "John Smith" },
    { id: "3", name: "Emily Davis" },
];

// Sample vehicles for the dropdown
const vehicles = [
    { id: "1", name: "123" },
    { id: "2", name: "456" },
    { id: "3", name: "789" },
];

// Sample stations for the dropdown
const stations = [
    { id: "1", name: "Shell" },
    { id: "2", name: "Chevron" },
    { id: "3", name: "BP" },
    { id: "4", name: "Exxon" },
    { id: "5", name: "Mobil" },
];

export default function FuelTrackerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDriver, setFilterDriver] = useState("all");

    // Modal form state
    const [selectedDriver, setSelectedDriver] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [gasStation, setGasStation] = useState("");
    const [amount, setAmount] = useState("");
    const [gallons, setGallons] = useState("");
    const [odometer, setOdometer] = useState("");
    const [notes, setNotes] = useState("");
    const [receiptDate, setReceiptDate] = useState<Date | undefined>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Stats calculations
    const thisWeekTotal = fuelReceipts.reduce((acc, r) => acc + r.amount, 0);
    const thisMonthTotal = fuelReceipts.reduce((acc, r) => acc + r.amount, 0);
    const gallonsThisMonth = fuelReceipts.reduce((acc, r) => acc + r.gallons, 0);
    const avgPerGallon = gallonsThisMonth > 0 ? thisMonthTotal / gallonsThisMonth : 0;

    // Handle form submission
    const handleSubmit = () => {
        if (!selectedDriver || !amount || !receiptDate) return;

        console.log("Fuel Receipt submitted:", {
            driver: selectedDriver,
            vehicle: selectedVehicle,
            gasStation,
            amount: parseFloat(amount),
            gallons: parseFloat(gallons) || 0,
            odometer,
            notes,
            date: receiptDate,
        });

        // Reset form and close modal
        setSelectedDriver("");
        setSelectedVehicle("");
        setGasStation("");
        setAmount("");
        setGallons("");
        setOdometer("");
        setNotes("");
        setReceiptDate(new Date());
        setIsModalOpen(false);
    };

    const isFormValid = selectedDriver && amount && receiptDate;

    // Filter fuel receipts
    const filteredReceipts = fuelReceipts.filter((receipt) => {
        const driverMatch = filterDriver === "all" || receipt.driver.name === filterDriver;
        const searchMatch = searchTerm === "" ||
            receipt.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
        return driverMatch && searchMatch;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Fuel Tracker</h2>
                    <p className="text-muted-foreground">Track fuel expenses and receipts</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Receipt
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Week</CardTitle>
                        <CalendarIcon className="size-8 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${thisWeekTotal.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Fuel expenses this week</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <DollarSign className="size-8 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${thisMonthTotal.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Monthly fuel expenses</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gallons (Month)</CardTitle>
                        <Droplet className="size-8 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gallonsThisMonth.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground">Total gallons this month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg $/Gallon</CardTitle>
                        <TrendingUp className="size-8 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${avgPerGallon.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Average price per gallon</p>
                    </CardContent>
                </Card>
            </div>

            {/* Fuel Receipts Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Fuel Receipts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters and Actions */}
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search receipts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                                />
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

                    {/* Table */}
                    <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Driver</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Gallons</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Station</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Vehicle</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Receipt</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredReceipts.length === 0 ? (
                                        <tr className="border-b transition-colors">
                                            <td colSpan={8} className="p-4 align-middle h-32 text-center">
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                    <Fuel className="h-10 w-10 mb-2" />
                                                    <p>No fuel receipts found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredReceipts.map((receipt) => (
                                            <tr key={receipt.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle">{receipt.date}</td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={receipt.driver.avatar || "/user-2.png"} alt={receipt.driver.name} />
                                                            <AvatarFallback>{receipt.driver.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="font-medium">{receipt.driver.name}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle text-emerald-600 font-medium">
                                                    ${receipt.amount.toFixed(2)}
                                                </td>
                                                <td className="p-4 align-middle">{receipt.gallons.toFixed(1)}</td>
                                                <td className="p-4 align-middle">{receipt.station}</td>
                                                <td className="p-4 align-middle">{receipt.vehicle}</td>
                                                <td className="p-4 align-middle text-muted-foreground">
                                                    {receipt.receipt || "-"}
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
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
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
                            Showing <strong>1-{filteredReceipts.length}</strong> of <strong>{filteredReceipts.length}</strong> receipts
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

            {/* Submit Receipt Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader className="pb-2">
                        <DialogTitle>Submit Fuel Receipt</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-3">
                        {/* Driver and Date Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                                <Label htmlFor="driver" className="text-sm">
                                    Driver <span className="text-destructive">*</span>
                                </Label>
                                <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                                    <SelectTrigger id="driver" className="h-9">
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
                            <div className="grid gap-1.5">
                                <Label htmlFor="date" className="text-sm">
                                    Date <span className="text-destructive">*</span>
                                </Label>
                                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant="outline"
                                            className={cn(
                                                "w-full h-9 justify-start text-left font-normal",
                                                !receiptDate && "text-muted-foreground"
                                            )}
                                        >
                                            {receiptDate ? format(receiptDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                            <CalendarIcon className="ml-auto h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={receiptDate}
                                            onSelect={(date) => {
                                                setReceiptDate(date);
                                                setIsCalendarOpen(false);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Amount and Gallons Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                                <Label htmlFor="amount" className="text-sm">
                                    Amount ($) <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="85.50"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="gallons" className="text-sm">Gallons</Label>
                                <Input
                                    id="gallons"
                                    type="number"
                                    step="0.1"
                                    placeholder="25.5"
                                    value={gallons}
                                    onChange={(e) => setGallons(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Gas Station Field */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="gasStation" className="text-sm">Gas Station</Label>
                            <Input
                                id="gasStation"
                                placeholder="Shell, Chevron, etc."
                                value={gasStation}
                                onChange={(e) => setGasStation(e.target.value)}
                                className="h-9"
                            />
                        </div>

                        {/* Vehicle ID and Odometer Row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                                <Label htmlFor="vehicleId" className="text-sm">Vehicle ID</Label>
                                <Input
                                    id="vehicleId"
                                    placeholder="Truck #123"
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="odometer" className="text-sm">Odometer</Label>
                                <Input
                                    id="odometer"
                                    type="number"
                                    placeholder="45000"
                                    value={odometer}
                                    onChange={(e) => setOdometer(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Receipt Image */}
                        <div className="grid gap-1.5">
                            <Label className="text-sm">Receipt Image</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex flex-col items-center justify-center h-16 border-2 border-dashed rounded-lg transition-colors"
                                >
                                    <Camera className="h-5 w-5 mb-1" />
                                    <span className="text-xs text-muted-foreground">Take Photo</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex flex-col items-center justify-center h-16 border-2 border-dashed rounded-lg transition-colors"
                                >
                                    <Upload className="h-5 w-5 mb-1" />
                                    <span className="text-xs text-muted-foreground">Upload File</span>
                                </button>
                            </div>
                        </div>

                        {/* Notes Field */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="notes" className="text-sm">Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any additional notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="resize-none"
                                rows={2}
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={!isFormValid} className="flex-1">
                            Submit Receipt
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
