"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

// Sample drivers data
const drivers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Emily Davis" },
    { id: "3", name: "Robert Wilson" },
    { id: "4", name: "Jessica Brown" },
    { id: "5", name: "Michael Johnson" },
];

// Sample routes data
const routes = [
    { id: "1", name: "Route A - Downtown" },
    { id: "2", name: "Route B - Suburbs" },
    { id: "3", name: "Route C - Industrial" },
    { id: "4", name: "Route D - Commercial" },
    { id: "5", name: "Route E - Residential" },
];

interface AddScheduleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialDate?: Date;
    onSubmit?: (data: {
        date: Date;
        driver: string;
        route: string;
        notes: string;
    }) => void;
}

export function AddScheduleModal({
    open,
    onOpenChange,
    initialDate,
    onSubmit,
}: AddScheduleModalProps) {
    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [driver, setDriver] = useState<string>("");
    const [route, setRoute] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Update date when initialDate changes
    useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
        }
    }, [initialDate]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setDate(initialDate);
            setDriver("");
            setRoute("");
            setNotes("");
        }
    }, [open, initialDate]);

    const handleSubmit = () => {
        if (!date || !driver || !route) {
            return;
        }

        onSubmit?.({
            date,
            driver,
            route,
            notes,
        });

        onOpenChange(false);
    };

    const isFormValid = date && driver && route;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Schedule</DialogTitle>
                    <DialogDescription>
                        Create a new schedule by filling out the details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Date Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="date">
                            Date <span className="text-destructive">*</span>
                        </Label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "Select a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => {
                                        setDate(newDate);
                                        setIsCalendarOpen(false);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Driver Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="driver">
                            Driver <span className="text-destructive">*</span>
                        </Label>
                        <Select value={driver} onValueChange={setDriver}>
                            <SelectTrigger id="driver">
                                <SelectValue placeholder="Select a driver" />
                            </SelectTrigger>
                            <SelectContent>
                                {drivers.map((d) => (
                                    <SelectItem key={d.id} value={d.id}>
                                        {d.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Route Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="route">
                            Route <span className="text-destructive">*</span>
                        </Label>
                        <Select value={route} onValueChange={setRoute}>
                            <SelectTrigger id="route">
                                <SelectValue placeholder="Select a route" />
                            </SelectTrigger>
                            <SelectContent>
                                {routes.map((r) => (
                                    <SelectItem key={r.id} value={r.id}>
                                        {r.name}
                                    </SelectItem>
                                ))}
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isFormValid}>
                        Add Schedule
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
