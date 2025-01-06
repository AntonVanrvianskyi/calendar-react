import React, {useMemo} from "react";
import {Day} from "@/interfaces/date.interface.ts";
import './index.css'
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import Event from "@/Calendar/day/Event.tsx";
import {IEvent} from "@/interfaces/event.interface.ts";

const DayCell: React.FC<{ day: Day; currentMonth: number }> = ({day, currentMonth}) => {
    const {setContextEventModal, setUpdateEvent, events} = useEventStore()
    const today = new Date();
    const isOtherMonth = day.date.getMonth() !== currentMonth;
    const isCurrentDay =
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getFullYear() === today.getFullYear();

    const filteredEvents = useMemo(() => {
        return events.filter((item) => {
            const eventDate = new Date(String(item.day));
            return (
                eventDate.getDate() === day.date.getDate() &&
                eventDate.getMonth() === day.date.getMonth() &&
                eventDate.getFullYear() === day.date.getFullYear()
            );
        });
    }, [events, day]);

    const handleOpenAddEventModal = () => {
        setContextEventModal({isOpen: true, payload: day.date, type: "add"})
    }
    // console.log(events, "events")

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, event: IEvent) => {
        e.dataTransfer.setData("event", JSON.stringify(event));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const event = JSON.parse(e.dataTransfer.getData("event"));

        const updatedEvent = {
            ...event,
            day: day.date.toISOString(),
        };
        setUpdateEvent(updatedEvent);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleOpenAddEventModal}
            className={`day-cell ${isCurrentDay ? 'active-day' : ''}`}
        >
      <span className={`day-number ${isOtherMonth ? 'other-month' : ''}`} style={{opacity: isOtherMonth ? 0.5 : 1}}>
        {day.date.getDate()}
      </span>
            {filteredEvents.map((event,) => (
                <Event key={String(event.id)} event={event} onDragStart={handleDragStart}/>
            ))}
        </div>
    );
};

export default DayCell
