import React from "react";
import {Day} from "@/interfaces/date.interface.ts";
import './index.css'

const DayCell: React.FC<{ day: Day; currentMonth: number }> = ({ day, currentMonth }) => {
    const isOtherMonth = day.date.getMonth() !== currentMonth;
    const isCurrentMonth = day.date.getMonth() === new Date(currentMonth).getMonth();
    const isCurrentDay = day.date.getDate() === new Date(currentMonth).getDay() && isCurrentMonth;

    return (
        <div className={`day-cell ${isCurrentDay  ? 'active-day' : ''}`}>
      <span className={`day-number ${isOtherMonth ? 'other-month' : ''}`} style={{ opacity: isOtherMonth ? 0.5 : 1 }}>
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
