"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const upcomingEvents = [
  {
    id: 1,
    title: "Weekly Team Meeting",
    muted: "text-muted-foreground",
  },
  {
    id: 2,
    title: "Black Friday Sale",
    muted: "text-muted-foreground",
  },
  {
    id: 3,
    title: "12.12 Sale",
    muted: "text-muted-foreground",
  },
  {
    id: 4,
    title: "Christmas Holiday",
    muted: "text-muted-foreground",
  },
  {
    id: 5,
    title: "Weekly Team Meeting",
    muted: "Year-End Sale",
  },
  {
    id: 6,
    title: "2024 Recap",
    muted: "text-muted-foreground",
  },
  {
    id: 7,
    title: "New Year Celebration",
    muted: "text-muted-foreground",
  },
  {
    id: 8,
    title: "2.2 BIG SALE",
    muted: "text-muted-foreground",
  },
  {
    id: 9,
    title: "Monthly Review Meeting ",
    muted: "text-muted-foreground",
  },
  {
    id: 10,
    title: "New Arrivals Launch ",
    muted: "text-muted-foreground",
  },
  {
    id: 11,
    title: "eNearby x Walking Contradiction ",
    muted: "text-muted-foreground",
  },
  {
    id: 12,
    title: "Wanderkid Event",
    muted: "text-muted-foreground",
  },
  {
    id: 13,
    title: "EXCAMP 2025",
    muted: "text-muted-foreground",
  },
  {
    id: 14,
    title: "50% MID-YEAR SALE",
    muted: "text-muted-foreground",
  },
  {
    id: 15,
    title: "eNearby x Jogging Club",
    muted: "text-muted-foreground",
  },
];

const ToDoList = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <h1 className="text-lg font-medium mb-4">Upcoming Events</h1>
        <PopoverTrigger asChild>
          <Button
            className="w-full"
            variant="default"
            onClick={() => setOpen(!open)}>
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-0 p-0 rounded-xl w-fit"
          align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            className="rounded-xl border w-80"
          />
        </PopoverContent>
      </Popover>
      <ScrollArea className="max-h-110 mt-6 overflow-y-auto rounded-md border p-4 sm-scrollbar">
        {/* List item */}
        <div className="flex flex-col gap-2">
          {upcomingEvents.map((item) => (
            <Card key={item.id} className="p-4 border-0 bg-white/5">
              <div className="flex items-center gap-4">
                <Checkbox id={`item${item.id}`} />
                <label htmlFor={`item${item.id}`}>{item.title}</label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ToDoList;
