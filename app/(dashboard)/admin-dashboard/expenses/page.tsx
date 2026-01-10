"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DollarSign,
    Download,
    Edit,
    Eye,
    Filter,
    Fuel,
    MoreHorizontal,
    Plus,
    RefreshCw,
    RefreshCcwIcon,
    Search,
    Trash2,
    Wallet,
    Wrench,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Fixed categories
const EXPENSE_CATEGORIES = [
    "Fuel",
    "Payroll",
    "Insurance",
    "Vehicle Maintenance",
    "Repairs",
    "Tolls",
    "Supplies",
    "Other",
];

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

// Colors for expense categories
const EXPENSE_COLORS = ["#f97316", "#8b5cf6", "#10b981", "#3b82f6", "#ef4444", "#eab308", "#06b6d4", "#84cc16"];

// Chart data is computed dynamically from expenseRecords in the component

// Sample expense records for table
interface ExpenseRecord {
    id: string;
    date: string;
    category: string;
    description: string;
    vendor: string;
    amount: number;
}

const expenseRecords: ExpenseRecord[] = [
    // Fuel expenses
    {
        id: "1",
        date: "Jan 10, 2026",
        category: "Fuel",
        description: "Weekly fuel fill-up - Route A",
        vendor: "Shell Gas Station",
        amount: 150.00,
    },
    {
        id: "2",
        date: "Jan 7, 2026",
        category: "Fuel",
        description: "Fuel for route delivery",
        vendor: "Chevron",
        amount: 125.00,
    },
    {
        id: "3",
        date: "Jan 5, 2026",
        category: "Fuel",
        description: "Emergency fuel top-up",
        vendor: "BP Station",
        amount: 75.00,
    },
    // Payroll expenses
    {
        id: "4",
        date: "Jan 10, 2026",
        category: "Payroll",
        description: "Driver wages - John Smith",
        vendor: "Internal Payroll",
        amount: 450.00,
    },
    {
        id: "5",
        date: "Jan 10, 2026",
        category: "Payroll",
        description: "Driver wages - Sarah Johnson",
        vendor: "Internal Payroll",
        amount: 520.00,
    },
    {
        id: "6",
        date: "Jan 10, 2026",
        category: "Payroll",
        description: "Driver bonus - Mike Wilson",
        vendor: "Internal Payroll",
        amount: 100.00,
    },
    // Insurance expenses
    {
        id: "7",
        date: "Jan 8, 2026",
        category: "Insurance",
        description: "Monthly vehicle insurance",
        vendor: "State Farm",
        amount: 280.00,
    },
    {
        id: "8",
        date: "Jan 1, 2026",
        category: "Insurance",
        description: "Liability insurance premium",
        vendor: "Allstate",
        amount: 150.00,
    },
    // Vehicle Maintenance expenses
    {
        id: "9",
        date: "Jan 9, 2026",
        category: "Vehicle Maintenance",
        description: "Oil change - Vehicle VH-001",
        vendor: "Quick Lube Service",
        amount: 75.00,
    },
    {
        id: "10",
        date: "Jan 6, 2026",
        category: "Vehicle Maintenance",
        description: "Tire rotation - Vehicle VH-003",
        vendor: "Discount Tire",
        amount: 60.00,
    },
    {
        id: "11",
        date: "Jan 4, 2026",
        category: "Vehicle Maintenance",
        description: "Brake inspection - Vehicle VH-002",
        vendor: "Midas Auto",
        amount: 85.00,
    },
    // Repairs expenses
    {
        id: "12",
        date: "Jan 8, 2026",
        category: "Repairs",
        description: "Windshield replacement - VH-004",
        vendor: "Safelite Auto Glass",
        amount: 350.00,
    },
    {
        id: "13",
        date: "Jan 3, 2026",
        category: "Repairs",
        description: "AC repair - Vehicle VH-001",
        vendor: "Cool Air Auto",
        amount: 225.00,
    },
    // Tolls expenses
    {
        id: "14",
        date: "Jan 10, 2026",
        category: "Tolls",
        description: "Weekly toll charges - Route A",
        vendor: "E-ZPass",
        amount: 45.00,
    },
    {
        id: "15",
        date: "Jan 9, 2026",
        category: "Tolls",
        description: "Bridge toll - Golden Gate",
        vendor: "FasTrak",
        amount: 15.00,
    },
    {
        id: "16",
        date: "Jan 7, 2026",
        category: "Tolls",
        description: "Highway tolls - Interstate 95",
        vendor: "SunPass",
        amount: 28.00,
    },
    // Supplies expenses
    {
        id: "17",
        date: "Jan 6, 2026",
        category: "Supplies",
        description: "Cleaning supplies",
        vendor: "Auto Zone",
        amount: 45.00,
    },
    {
        id: "18",
        date: "Jan 5, 2026",
        category: "Supplies",
        description: "First aid kit replacement",
        vendor: "Walmart",
        amount: 35.00,
    },
    {
        id: "19",
        date: "Jan 4, 2026",
        category: "Supplies",
        description: "Safety vests and cones",
        vendor: "Home Depot",
        amount: 120.00,
    },
    // Other expenses
    {
        id: "20",
        date: "Jan 9, 2026",
        category: "Other",
        description: "Parking fees - Downtown lot",
        vendor: "City Parking",
        amount: 25.00,
    },
    {
        id: "21",
        date: "Jan 7, 2026",
        category: "Other",
        description: "Vehicle registration renewal",
        vendor: "DMV",
        amount: 175.00,
    },
    {
        id: "22",
        date: "Jan 2, 2026",
        category: "Other",
        description: "GPS subscription monthly",
        vendor: "Fleet GPS Co",
        amount: 49.99,
    },
];

export default function ExpensesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterVendor, setFilterVendor] = useState("all");

    const { startOfWeek, endOfWeek } = getWeekDates(currentDate);

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

    // Get unique vendors for dropdown
    const uniqueVendors = [...new Set(expenseRecords.map(e => e.vendor))];

    // Compute chart data from expense records
    const categoryTotals = EXPENSE_CATEGORIES.reduce((acc, category) => {
        const total = expenseRecords
            .filter(e => e.category === category)
            .reduce((sum, e) => sum + e.amount, 0);
        acc[category] = total;
        return acc;
    }, {} as Record<string, number>);

    // Pie chart data - only categories with expenses > 0
    const expenseBreakdownData = EXPENSE_CATEGORIES
        .filter(category => categoryTotals[category] > 0)
        .map(category => ({
            name: category,
            value: categoryTotals[category],
        }));

    // Bar chart data - all categories
    const categoryExpensesData = EXPENSE_CATEGORIES.map(category => ({
        name: category,
        expenses: categoryTotals[category],
    }));

    // Calculate total expenses
    const totalExpenses = expenseRecords.reduce((sum, e) => sum + e.amount, 0);

    // Filter expense records based on search and category
    const filteredExpenses = expenseRecords.filter((expense) => {
        const searchMatch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.vendor.toLowerCase().includes(searchQuery.toLowerCase());

        const categoryMatch = filterCategory === "all" || expense.category === filterCategory;
        const vendorMatch = filterVendor === "all" || expense.vendor === filterVendor;

        return searchMatch && categoryMatch && vendorMatch;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Expenses</h2>
                    <p className="text-muted-foreground">Track and manage fleet expenses</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                </Button>
            </div>

            {/* Week Navigation */}
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

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <DollarSign className="size-8 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">All recorded expenses</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fuel</CardTitle>
                        <Fuel className="size-8 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(categoryTotals["Fuel"] || 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Fuel costs</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Payroll</CardTitle>
                        <Wallet className="size-8 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(categoryTotals["Payroll"] || 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Driver wages</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                        <Wrench className="size-8 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(categoryTotals["Vehicle Maintenance"] || 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Maintenance costs</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2">
                {/* Expense Breakdown - Pie Chart (same as Revenue by Department) */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Expense Breakdown</CardTitle>
                        <CardDescription>Distribution of expenses by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ChartContainer
                                config={{
                                    value: {
                                        label: "Expense",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="h-full w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={expenseBreakdownData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            paddingAngle={2}
                                        >
                                            {expenseBreakdownData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            content={<ChartTooltipContent />}
                                            wrapperStyle={{
                                                backgroundColor: 'white',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* By Category - Horizontal Bar Chart (same as Department Expenses) */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>By Category</CardTitle>
                        <CardDescription>Expenses by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ChartContainer
                                config={{
                                    expenses: {
                                        label: "Expenses",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="h-full w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={categoryExpensesData}
                                        layout="vertical"
                                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="name" width={90} />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Bar dataKey="expenses" fill="var(--color-expenses)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Expense Records Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Expense Records</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters and Actions */}
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search expenses..."
                                    className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <Select value={filterVendor} onValueChange={setFilterVendor}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="All Vendors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Vendors</SelectItem>
                                    {uniqueVendors.map((vendor) => (
                                        <SelectItem key={vendor} value={vendor}>
                                            {vendor}
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

                    {/* Tabs for Category Filter */}
                    <Tabs defaultValue="all" className="w-full" onValueChange={setFilterCategory}>
                        <TabsList className="flex-wrap h-auto">
                            <TabsTrigger value="all">All</TabsTrigger>
                            {EXPENSE_CATEGORIES.map((category) => (
                                <TabsTrigger key={category} value={category}>
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value={filterCategory} className="space-y-4">

                            {/* Table */}
                            <div className="rounded-md border">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Vendor</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                                                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {filteredExpenses.length === 0 ? (
                                                <tr className="border-b transition-colors">
                                                    <td colSpan={6} className="p-4 align-middle h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <DollarSign className="h-10 w-10 mb-2" />
                                                            <p>No expense records found</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredExpenses.map((expense) => (
                                                    <tr key={expense.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                        <td className="p-4 align-middle">{expense.date}</td>
                                                        <td className="p-4 align-middle">{expense.category}</td>
                                                        <td className="p-4 align-middle">{expense.description}</td>
                                                        <td className="p-4 align-middle">{expense.vendor}</td>
                                                        <td className="p-4 align-middle font-medium">
                                                            ${expense.amount.toFixed(2)}
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
                                    Showing <strong>1-{filteredExpenses.length}</strong> of <strong>{filteredExpenses.length}</strong> expenses
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
        </div>
    )
}

