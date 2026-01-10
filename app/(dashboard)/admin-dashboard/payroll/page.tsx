"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DollarSign,
    RefreshCcwIcon,
    TrendingUp,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Helper function to get week dates
function getWeekDates(date: Date) {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(currentDay.getDate() + i);
        weekDays.push(currentDay);
    }

    return { startOfWeek, endOfWeek, weekDays };
}

function formatWeekRange(start: Date, end: Date) {
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const endDay = end.getDate();
    const year = end.getFullYear();

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

// Day status type
type DayStatus = "completed" | "in-progress" | "scheduled" | "cancelled" | null;

// Sample drivers data
interface DriverPayroll {
    id: string;
    name: string;
    payType: "daily" | "hourly" | "per-route";
    rate: number;
    days: DayStatus[];
    completedDays: number;
    total: number;
}

const driversData: DriverPayroll[] = [
    {
        id: "1",
        name: "Malik Arif",
        payType: "daily",
        rate: 180.00,
        days: [null, null, null, null, null, null, null],
        completedDays: 0,
        total: 0,
    },
    {
        id: "2",
        name: "John Smith",
        payType: "daily",
        rate: 200.00,
        days: ["completed", "completed", "in-progress", null, "scheduled", "scheduled", null],
        completedDays: 2,
        total: 400.00,
    },
    {
        id: "3",
        name: "Sarah Johnson",
        payType: "hourly",
        rate: 25.00,
        days: ["completed", "completed", "completed", "completed", null, null, null],
        completedDays: 4,
        total: 800.00,
    },
    {
        id: "4",
        name: "Mike Wilson",
        payType: "per-route",
        rate: 50.00,
        days: ["completed", "cancelled", "completed", "in-progress", "scheduled", null, null],
        completedDays: 2,
        total: 100.00,
    },
];

export default function PayrollPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDriver, setSelectedDriver] = useState("all-drivers");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const { startOfWeek, endOfWeek, weekDays } = getWeekDates(currentDate);

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const goToCurrentWeek = () => {
        setCurrentDate(new Date());
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setCurrentDate(date);
            setIsCalendarOpen(false);
        }
    };

    // Filter drivers based on selection
    const filteredDrivers = selectedDriver === "all-drivers"
        ? driversData
        : driversData.filter(d => d.id === selectedDriver);

    // Calculate totals
    const completedEarnings = filteredDrivers.reduce((sum, d) => sum + d.total, 0);
    const projectedTotal = filteredDrivers.reduce((sum, d) => {
        const scheduledDays = d.days.filter(s => s === "scheduled" || s === "in-progress").length;
        return sum + d.total + (scheduledDays * d.rate);
    }, 0);
    const completedDaysTotal = filteredDrivers.reduce((sum, d) => sum + d.completedDays, 0);

    const getDayLabel = (index: number) => {
        const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return labels[index];
    };

    const getStatusBadge = (status: DayStatus) => {
        if (!status) return <span className="text-muted-foreground">-</span>;

        const colors = {
            "completed": "bg-green-500",
            "in-progress": "bg-amber-500",
            "scheduled": "bg-blue-500",
            "cancelled": "bg-red-500",
        };

        return (
            <span className={`inline-block w-3 h-3 rounded-full ${colors[status]}`} />
        );
    };

    const formatPayType = (payType: string) => {
        const labels: { [key: string]: string } = {
            "daily": "daily",
            "hourly": "hourly",
            "per-route": "per route",
        };
        return labels[payType] || payType;
    };

    const formatRate = (rate: number, payType: string) => {
        const suffix: { [key: string]: string } = {
            "daily": "/day",
            "hourly": "/hr",
            "per-route": "/route",
        };
        return `$${rate.toFixed(2)}${suffix[payType] || ""}`;
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Payroll</h1>
                <p className="text-muted-foreground">Calculate driver wages based on completed routes</p>
            </div>

            {/* Week Navigation & Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToNextWeek}>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>

                    {/* Week Picker Calendar */}
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "ml-2 justify-start text-left font-medium",
                                    !currentDate && "text-muted-foreground"
                                )}
                            >
                                {formatWeekRange(startOfWeek, endOfWeek)}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={currentDate}
                                onSelect={handleDateSelect}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="All Drivers" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-drivers">All Drivers</SelectItem>
                            {driversData.map((driver) => (
                                <SelectItem key={driver.id} value={driver.id}>
                                    {driver.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <RefreshCcwIcon className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
                            This Week
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Matching PTO design */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Earnings</CardTitle>
                        <DollarSign className="size-8 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${completedEarnings.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total from completed routes</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projected Total</CardTitle>
                        <TrendingUp className="size-8 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${projectedTotal.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Including scheduled routes</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Days</CardTitle>
                        <CalendarIcon className="size-8 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedDaysTotal}</div>
                        <p className="text-xs text-muted-foreground">Total work days completed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Weekly Breakdown Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium">Driver</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Pay Type</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Rate</th>
                                        {weekDays.map((day, index) => (
                                            <th key={index} className="h-12 px-3 text-center align-middle font-medium">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-muted-foreground text-xs">{getDayLabel(index)}</span>
                                                    <span>{day.getDate()}</span>
                                                </div>
                                            </th>
                                        ))}
                                        <th className="h-12 px-4 text-center align-middle font-medium">Days</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredDrivers.length === 0 ? (
                                        <tr className="border-b transition-colors">
                                            <td colSpan={12} className="p-4 align-middle h-32 text-center">
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                    <DollarSign className="h-10 w-10 mb-2" />
                                                    <p>No payroll data found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredDrivers.map((driver) => (
                                            <tr key={driver.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle font-medium">{driver.name}</td>
                                                <td className="p-4 align-middle">
                                                    <span >{formatPayType(driver.payType)}</span>
                                                </td>
                                                <td className="p-4 align-middle">{formatRate(driver.rate, driver.payType)}</td>
                                                {driver.days.map((status, index) => (
                                                    <td key={index} className="p-3 align-middle text-center">
                                                        {getStatusBadge(status)}
                                                    </td>
                                                ))}
                                                <td className="p-4 align-middle text-center">{driver.completedDays}</td>
                                                <td className="p-4 align-middle text-right font-medium ">
                                                    ${driver.total.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Status Legend */}
                    <div className="flex flex-wrap items-center gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
                            <span>In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
                            <span>Scheduled</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                            <span>Cancelled</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
