"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { getAvailableSlots, bookSlot } from "~/server/actions/interviewSlots";
import { useRouter } from "next/navigation";

interface BookInterviewProps {
  jobPostingId: string;
  userId: string;
  applicationId: number;
}

interface InterviewSlot {
  id: number;
  date: string | Date;
  jobPostingId: number;
  userId: string | null;
  type: string;
  isBooked: boolean;
  applicants: number;
  applicationId: number | null;
}

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

interface TimeSlotsProps {
  slots: InterviewSlot[];
  selectedSlot: InterviewSlot | null;
  setSelectedSlot: (slot: InterviewSlot | null) => void;
}

export default function BookInterview({
  jobPostingId,
  userId,
  applicationId,
}: BookInterviewProps) {
  const [date, setDate] = React.useState<Date>();
  const [availableSlots, setAvailableSlots] = React.useState<InterviewSlot[]>(
    [],
  );
  const [selectedSlot, setSelectedSlot] = React.useState<InterviewSlot | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (date) {
      void fetchAvailableSlots();
    }
  }, [date]);

  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    setError("");
    try {
      const slots = await getAvailableSlots(date!);
      setAvailableSlots(slots as InterviewSlot[]);
    } catch (err) {
      setError("Failed to fetch available slots. Please try again.");
    }
    setIsLoading(false);
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return;

    setIsLoading(true);
    setError("");
    try {
      await bookSlot(selectedSlot.id, applicationId, userId);
      router.push("/booking-confirmation");
    } catch (err) {
      setError("Failed to book the slot. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Book Your Interview
          </h1>
          <p className="text-xl text-gray-600">
            Select a date and time slot for your interview
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">Available Time Slots</h2>
          {isLoading ? (
            <p>Loading available slots...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <TimeSlots
              slots={availableSlots}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          )}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleBookSlot}
            disabled={!selectedSlot || isLoading}
          >
            {isLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function TimeSlots({ slots, selectedSlot, setSelectedSlot }: TimeSlotsProps) {
  if (slots.length === 0) {
    return <p>No available slots for the selected date.</p>;
  }

  const formatSlotDate = (date: Date | string) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return format(parsedDate, "h:mm a") as string;
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {slots.map((slot) => (
        <Button
          key={slot.id}
          variant={selectedSlot?.id === slot.id ? "default" : "outline"}
          className={cn(
            "py-6 text-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50",
            selectedSlot?.id === slot.id && "border-blue-300 bg-blue-100",
          )}
          onClick={() => setSelectedSlot(slot)}
        >
          {formatSlotDate(slot.date)}
        </Button>
      ))}
    </div>
  );
}
