import React from "react";
import {Day} from "@/interfaces/date.interface.ts";
import './index.css'

const DayCell: React.FC<{ day: Day; currentMonth: number }> = ({day, currentMonth}) => {
    const today = new Date();
    const isOtherMonth = day.date.getMonth() !== currentMonth;
    const isCurrentDay =
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getFullYear() === today.getFullYear();

    return (
        <div className={`day-cell ${isCurrentDay ? 'active-day' : ''}`}>
      <span className={`day-number ${isOtherMonth ? 'other-month' : ''}`} style={{opacity: isOtherMonth ? 0.5 : 1}}>
        {day.date.getDate()}
      </span>
            {day.events.map((event, i) => (
                <div key={i} className="event">
                    {event}
                </div>
            ))}
        </div>
    );
};

export default DayCell
