import React from "react";
import {Day} from "@/interfaces/date.interface.ts";
import DayCell from "@/Calendar/day";

const MonthView: React.FC<{ days: Day[]; currentMonth: number }> = ({ days, currentMonth }) => {
    return (
        <div className="month-view">
            {days.map((day, index) => (
                <DayCell key={index} day={day} currentMonth={currentMonth} />
            ))}
        </div>
    );
};

export default MonthView
