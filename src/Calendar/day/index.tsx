import React, {useMemo} from "react";
import {Day} from "@/interfaces/date.interface.ts";
import './index.css'
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import Event from "@/Calendar/day/Event.tsx";

const DayCell: React.FC<{ day: Day; currentMonth: number }> = ({day, currentMonth}) => {
    const {setContextEventModal, events} = useEventStore()
    const today = new Date();
    const isOtherMonth = day.date.getMonth() !== currentMonth;
    const isCurrentDay =
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getFullYear() === today.getFullYear();

    const filteredEvents = useMemo(() => {
        return events.filter((item) => new Date(String(item.day)).getDate() === day.date.getDate() &&
            new Date(String(item.day)).getMonth() === currentMonth
        );
    }, [events, day, currentMonth]);

    const handleOpenAddEventModal = () => {
        setContextEventModal({isOpen: true, payload: day.date, type: "add"})
    }
    console.log(events, "events")


    return (
        <div onClick={handleOpenAddEventModal} className={`day-cell ${isCurrentDay ? 'active-day' : ''}`}>
      <span className={`day-number ${isOtherMonth ? 'other-month' : ''}`} style={{opacity: isOtherMonth ? 0.5 : 1}}>
        {day.date.getDate()}
      </span>
            {filteredEvents.map((event,) => (
                <Event key={String(event.id)} event={event}/>
            ))}
        </div>
    );
};

export default DayCell
