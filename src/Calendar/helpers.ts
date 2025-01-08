import {Day} from "@/interfaces/date.interface.ts";
import {IEvent} from "@/interfaces/event.interface.ts";

export const attachEventsToDays = (days: Day[], events: IEvent[]): Day[] => {
    return days.map((day) => {
        const dayDate = new Date(day.date).toDateString();
        const relatedEvents = events.filter((event) => {
            const eventDate = new Date(String(event.day)).toDateString();
            return eventDate === dayDate;
        });
        return {...day, events: relatedEvents};
    });
};
