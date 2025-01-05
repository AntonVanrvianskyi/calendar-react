import React, {useMemo} from "react";
import {Day} from "@/interfaces/date.interface.ts";
import './index.css'
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";

const DayCell: React.FC<{ day: Day; currentMonth: number }> = ({day, currentMonth}) => {
    const {setContextEventModal, events} = useEventStore()
    const today = new Date();
    const isOtherMonth = day.date.getMonth() !== currentMonth;
    const isCurrentDay =
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getFullYear() === today.getFullYear();

    const filteredEvents = useMemo(() => {
        return events.filter((item) => new Date(item.id).getTime() === day.date.getTime() &&
            new Date(item.id).getMonth() === day.date.getMonth()
        );
    }, [events, day])
    // console.log(events)
    // console.log(new Date(events[0].id).getDay())
    console.log(filteredEvents)
    const handleOpenAddEventModal = () => {
        setContextEventModal({isOpen: true, payload: day.date})
    }


    return (
        <div onClick={handleOpenAddEventModal} className={`day-cell ${isCurrentDay ? 'active-day' : ''}`}>
      <span className={`day-number ${isOtherMonth ? 'other-month' : ''}`} style={{opacity: isOtherMonth ? 0.5 : 1}}>
        {day.date.getDate()}
      </span>
            {filteredEvents.map((event, i) => (
                <div key={i} className="event">
                    {event.event}
                </div>
            ))}
        </div>
    );
};

export default DayCell
