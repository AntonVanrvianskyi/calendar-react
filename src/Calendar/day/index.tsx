import React, {MouseEvent, useMemo} from "react";
import {Day} from "@/interfaces/date.interface.ts";
import './index.css'
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import Event from "@/Calendar/day/Event.tsx";
import {IEvent} from "@/interfaces/event.interface.ts";

interface Props {
    day: Day;
    currentMonth: number
}

const DayCell: React.FC<Props> = ({day, currentMonth}) => {
    const {setContextEventModal, reorderEvents, setUpdateEvent} = useEventStore()
    const today = new Date();
    const isOtherMonth = day.date.getMonth() !== currentMonth;
    const isCurrentDay =
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getFullYear() === today.getFullYear();

    const filteredEvents = useMemo(() => {
        return day.events
            .filter((item) => {
                const eventDate = new Date(String(item.day));
                return (
                    eventDate.getDate() === day.date.getDate() &&
                    eventDate.getMonth() === day.date.getMonth() &&
                    eventDate.getFullYear() === day.date.getFullYear()
                );
            })
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); // Сортуємо події за полем `order`
    }, [day]);

    const handleOpenAddEventModal = () => {
        setContextEventModal({isOpen: true, payload: day.date, type: "add"})
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, event: IEvent) => {
        console.log(event, "handleDragStart")
        e.dataTransfer.setData("event", JSON.stringify(event));
        e.dataTransfer.setData("sourceDay", day.date.toISOString());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetEvent?: IEvent) => {
        e.preventDefault();
        const droppedEvent = JSON.parse(e.dataTransfer.getData("event"));
        const sourceDay = e.dataTransfer.getData("sourceDay");
        console.log(sourceDay, 'source day')
        if (sourceDay === day.date.toISOString()) {
            if (targetEvent) {
                console.log(droppedEvent.id, targetEvent.id, "ids");
                reorderEvents(droppedEvent.id, Number(targetEvent.id), day.date);
            }
        } else {
            const updatedEvent = {
                ...droppedEvent,
                day: day.date,
                order: filteredEvents.length,
            };
            setUpdateEvent(updatedEvent);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleEventClick = (e: MouseEvent<HTMLDivElement>, event: IEvent) => {
        if (event.isHoliday) return
        e.stopPropagation();
        setContextEventModal({isOpen: true, type: "edit", editEvent: event, id: event.id})
    }

    return (
        <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={handleDragOver}
            onClick={handleOpenAddEventModal}
            className={`day-cell ${isCurrentDay ? 'active-day' : ''}`}
        >
      <span className={`day-number ${isOtherMonth ? 'other-month' : ''}`} style={{opacity: isOtherMonth ? 0.5 : 1}}>
        {day.date.getDate()}
      </span>
            {filteredEvents.map((event,) => (
                <div
                    onClick={(e) => handleEventClick(e, event)}
                    className="event"
                    key={event.id}
                    draggable={!event.isHoliday}
                    onDragStart={(e) => handleDragStart(e, event)}
                    onDrop={(e) => handleDrop(e, event)}
                    onDragOver={handleDragOver}
                >
                    <Event event={event}/>
                </div>
            ))}
        </div>
    );
};

export default DayCell
