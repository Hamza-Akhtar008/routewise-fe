"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Archive, BookOpen, CalendarIcon, CheckCircle, Clock, Download, Eye, FileText, Filter, MoreVertical, RefreshCw, Search, Trash, Upload } from "lucide-react"
import { useState } from "react"

// Sample handbook stats
const handbookStats = {
    activeVersion: "v2.3",
    acceptedDrivers: 0,
    totalDrivers: 1,
    pendingDrivers: 1,
};

// Sample handbooks list
interface Handbook {
    id: string;
    title: string;
    version: string;
    uploadedDate: string;
    status: "Active" | "Archived";
}

const handbooksList: Handbook[] = [
    {
        id: "1",
        title: "Employee Handbook",
        version: "1.0",
        uploadedDate: "Jan 9, 2026",
        status: "Active",
    },
];

// All handbook versions data
const allHandbookVersions: Handbook[] = [
    {
        id: "1",
        title: "Employee Handbook",
        version: "2.3",
        uploadedDate: "Jan 9, 2026",
        status: "Active",
    },
    {
        id: "2",
        title: "Employee Handbook",
        version: "2.2",
        uploadedDate: "Dec 15, 2025",
        status: "Archived",
    },
    {
        id: "3",
        title: "Employee Handbook",
        version: "2.1",
        uploadedDate: "Nov 20, 2025",
        status: "Archived",
    },
    {
        id: "4",
        title: "Employee Handbook",
        version: "2.0",
        uploadedDate: "Oct 5, 2025",
        status: "Archived",
    },
    {
        id: "5",
        title: "Employee Handbook",
        version: "1.0",
        uploadedDate: "Sep 1, 2025",
        status: "Archived",
    },
];

// Sample driver acceptance data
interface DriverAcceptance {
    id: string;
    driver: { name: string; avatar: string };
    status: "Accepted" | "Pending";
    acceptedDate: string;
    version: string;
}

const driverAcceptanceData: DriverAcceptance[] = [
    {
        id: "1",
        driver: { name: "John Smith", avatar: "" },
        status: "Pending",
        acceptedDate: "-",
        version: "1.0",
    },
    {
        id: "2",
        driver: { name: "Sarah Johnson", avatar: "" },
        status: "Accepted",
        acceptedDate: "Jan 10, 2026",
        version: "1.0",
    },
    {
        id: "3",
        driver: { name: "Mike Wilson", avatar: "" },
        status: "Accepted",
        acceptedDate: "Jan 9, 2026",
        version: "1.0",
    },
    {
        id: "4",
        driver: { name: "Emily Davis", avatar: "" },
        status: "Pending",
        acceptedDate: "-",
        version: "1.0",
    },
];

export default function HandbookPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Filter driver acceptance based on search and status
    const filteredDrivers = driverAcceptanceData.filter((item) => {
        const searchMatch = item.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
        const statusMatch = filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();
        return searchMatch && statusMatch;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Handbook</h2>
                    <p className="text-muted-foreground">Manage company handbooks and documents</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Handbook
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Handbook</CardTitle>
                        <BookOpen className="size-8 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{handbookStats.activeVersion}</div>
                        <p className="text-xs text-muted-foreground">Current version</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                        <CheckCircle className="size-8 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{handbookStats.acceptedDrivers} / {handbookStats.totalDrivers} drivers</div>
                        <p className="text-xs text-muted-foreground">Handbook acknowledged</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="size-8 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{handbookStats.pendingDrivers} drivers</div>
                        <p className="text-xs text-muted-foreground">Awaiting acknowledgment</p>
                    </CardContent>
                </Card>
            </div>

            {/* Handbooks List */}
            <div className="space-y-4">
                {handbooksList.map((handbook) => (
                    <Card key={handbook.id}>
                        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
                            <div className="flex items-start gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <h3 className="font-medium">
                                        {handbook.status === "Active" ? "Current Handbook: " : ""}{handbook.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={handbook.status === "Active" ? "success" : "secondary"}>
                                            {handbook.status}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Version {handbook.version}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            Uploaded {handbook.uploadedDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Handbook
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Driver Acceptance Status Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Driver Acceptance Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters and Actions */}
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="flex flex-wrap gap-3 md:items-center md:space-y-0">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search drivers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                                />
                            </div>

                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
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
                                        <th className="h-12 px-4 text-left align-middle font-medium">Driver</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Accepted Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Version</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {filteredDrivers.length === 0 ? (
                                        <tr className="border-b transition-colors">
                                            <td colSpan={4} className="p-4 align-middle h-32 text-center">
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                    <FileText className="h-10 w-10 mb-2" />
                                                    <p>No drivers found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredDrivers.map((item) => (
                                            <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={item.driver.avatar || "/user-2.png"} alt={item.driver.name} />
                                                            <AvatarFallback>{item.driver.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">{item.driver.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <Badge variant={item.status === "Accepted" ? "success" : "warning"}>
                                                        {item.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground">
                                                    {item.acceptedDate}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {item.version}
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
                            Showing <strong>1-{filteredDrivers.length}</strong> of <strong>{driverAcceptanceData.length}</strong> drivers
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

            {/* All Handbook Versions Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Handbook Versions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Table */}
                    <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm whitespace-nowrap">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Version</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Upload Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {allHandbookVersions.map((handbook) => (
                                        <tr key={handbook.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{handbook.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {handbook.version}
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {handbook.uploadedDate}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <Badge variant={handbook.status === "Active" ? "success" : "secondary"}>
                                                    {handbook.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle text-right">
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
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download
                                                        </DropdownMenuItem>
                                                        {handbook.status === "Active" ? (
                                                            <DropdownMenuItem>
                                                                <Archive className="mr-2 h-4 w-4" />
                                                                Archive
                                                            </DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Set as Active
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
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
                            Showing <strong>1-{allHandbookVersions.length}</strong> of <strong>{allHandbookVersions.length}</strong> versions
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
        </div>
    )
}
