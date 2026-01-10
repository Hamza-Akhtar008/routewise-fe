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
import { Edit, Eye, Filter, MapPin, MoreVertical, Plus, RefreshCw, Route, Search, Trash, XCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Sample route stats
const routeStats = {
    totalRoutes: 24,
    activeRoutes: 18,
    inactiveRoutes: 6,
};

// Mock data for routes with correct fields
interface RouteData {
    id: string;
    name: string;
    description: string;
    estMiles: number;
    estStops: number;
    status: "Active" | "Inactive";
}

const routesData: RouteData[] = [
    {
        id: "1",
        name: "Downtown Express",
        description: "Main downtown delivery route covering central business district",
        estMiles: 45.2,
        estStops: 12,
        status: "Active",
    },
    {
        id: "2",
        name: "Suburban Loop",
        description: "Residential area deliveries in suburban neighborhoods",
        estMiles: 32.5,
        estStops: 8,
        status: "Active",
    },
    {
        id: "3",
        name: "Industrial Zone",
        description: "Industrial park and warehouse deliveries",
        estMiles: 58.8,
        estStops: 15,
        status: "Active",
    },
    {
        id: "4",
        name: "Airport Shuttle",
        description: "Airport and surrounding hotel deliveries",
        estMiles: 28.0,
        estStops: 5,
        status: "Active",
    },
    {
        id: "5",
        name: "North District",
        description: "Northern region residential and commercial areas",
        estMiles: 40.0,
        estStops: 10,
        status: "Inactive",
    },
    {
        id: "6",
        name: "East Side Run",
        description: "Eastern neighborhoods and shopping centers",
        estMiles: 52.3,
        estStops: 14,
        status: "Active",
    },
    {
        id: "7",
        name: "South Express",
        description: "Southern industrial and commercial zone",
        estMiles: 35.0,
        estStops: 7,
        status: "Inactive",
    },
    {
        id: "8",
        name: "West Side Loop",
        description: "Western suburbs and retail areas",
        estMiles: 48.5,
        estStops: 11,
        status: "Active",
    },
];

export default function RoutesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter routes based on search
    const filteredRoutes = routesData.filter((route) =>
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Routes</h2>
                        <p className="text-muted-foreground">Manage and track delivery routes</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Route
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
                            <Route className="size-8 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{routeStats.totalRoutes}</div>
                            <p className="text-xs text-muted-foreground">All registered routes</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
                            <MapPin className="size-8 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{routeStats.activeRoutes}</div>
                            <p className="text-xs text-muted-foreground">Currently active routes</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inactive Routes</CardTitle>
                            <XCircle className="size-8 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{routeStats.inactiveRoutes}</div>
                            <p className="text-xs text-muted-foreground">Routes not in use</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Routes Table Section */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Route Directory</CardTitle>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search routes..."
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
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
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
                                                <TableHead>Route Name</TableHead>
                                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                                <TableHead>Est. Miles</TableHead>
                                                <TableHead>Est. Stops</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="whitespace-nowrap">
                                            {filteredRoutes.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="h-32 text-center">
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <Route className="h-10 w-10 mb-2" />
                                                            <p>No routes found</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredRoutes.map((route) => (
                                                    <TableRow key={route.id}>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                                    <Route className="h-4 w-4 text-primary" />
                                                                </div>
                                                                <div className="font-medium">{route.name}</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            <span className="text-muted-foreground line-clamp-1 max-w-[300px]">
                                                                {route.description}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>{route.estMiles} mi</TableCell>
                                                        <TableCell>{route.estStops}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={route.status === "Active" ? "success" : "secondary"}>
                                                                {route.status}
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
                                                                        <Link href={`/admin-dashboard/routes/${route.id}`}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={`/admin-dashboard/routes/${route.id}/edit`}>
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
                                        Showing <strong>1-{filteredRoutes.length}</strong> of <strong>{routesData.length}</strong> routes
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
                                    {filteredRoutes.map((route) => (
                                        <Card key={route.id} className="overflow-hidden">
                                            <CardContent className="!p-0">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center justify-between bg-muted p-2 lg:p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                <Route className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{route.name}</div>
                                                                <div className="text-xs text-muted-foreground">{route.estMiles} mi • {route.estStops} stops</div>
                                                            </div>
                                                        </div>
                                                        <Badge variant={route.status === "Active" ? "success" : "secondary"}>
                                                            {route.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="p-4">
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {route.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex border-t">
                                                        <Button asChild variant="ghost" className="flex-1 rounded-none rounded-bl-md py-2">
                                                            <Link href={`/admin-dashboard/routes/${route.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </Button>
                                                        <Button asChild variant="ghost" className="flex-1 rounded-none rounded-br-md border-l py-2">
                                                            <Link href={`/admin-dashboard/routes/${route.id}/edit`}>
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
                                        Showing <strong>1-{filteredRoutes.length}</strong> of <strong>{routesData.length}</strong> routes
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
                        <AlertDialogTitle>Are you sure you want to delete this route?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will permanently delete the route from the system. This action cannot be undone.
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
