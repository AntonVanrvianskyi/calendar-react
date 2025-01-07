import React, {memo, useMemo} from "react";
import {Day} from "@/interfaces/date.interface.ts";
import DayCell from "@/Calendar/day";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";

const MonthView: React.FC<{ days: Day[]; currentMonth: number }> = ({ days, currentMonth }) => {
    const events = useEventStore(state => state.events)
    console.log(events, 'events')
    const daysWithEvents  = useMemo(() => {
        return days.map(day => {
            const dayDate = new Date(day.date).toDateString(); // Нормалізуємо дату
            const relatedEvents = events.filter((event) => {
                const eventDate = new Date(String(event.day)).toDateString(); // Нормалізуємо дату події
                return eventDate === dayDate;
            });
            return { ...day, events: relatedEvents };
        })
    }, [events, days])
    console.log(daysWithEvents, 'daysWithEvents');
    // console.log(days, 'days')
    return (
        <div className="month-view">
            {daysWithEvents.map((day, index) => (
                <DayCell key={index} day={day} currentMonth={currentMonth} />
            ))}
        </div>
    );
};

export default memo(MonthView)
