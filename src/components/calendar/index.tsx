import React, { useState } from 'react';
import './index.css';
import MonthView from "@/components/month";
import WeekView from "@/components/weak";
import {useGenerateMonth} from "@/hooks/useGenerateMonth.ts";
import {useGenerateWeekDays} from "@/hooks/useGenerateWeekDays.ts";

type ViewMode = 'month' | 'week';

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [days] = useGenerateMonth(currentDate)
    const [weekDays] = useGenerateWeekDays(currentDate)


    const changeDate = (direction: 'prev' | 'next') => {
        const delta = viewMode === 'month' ? 1 : 7;
        const updatedDate = new Date(currentDate);

        if (viewMode === 'month') {
            updatedDate.setMonth(updatedDate.getMonth() + (direction === 'prev' ? -1 : 1));
        } else {
            updatedDate.setDate(updatedDate.getDate() + (direction === 'prev' ? -delta : delta));
        }

        setCurrentDate(updatedDate);
    };

    return (
        <section className="calendar">
            <header className="calendar-header">
                <button className="nav-button" onClick={() => changeDate('prev')}>&lt;</button>
                <h2 className="calendar-title">
                    {currentDate.toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </h2>
                <button className="nav-button" onClick={() => changeDate('next')}>&gt;</button>

                <div className="view-switcher">
                    <button className={`view-button ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>Month</button>
                    <button className={`view-button ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>Week</button>
                </div>
            </header>

            <div className="day-labels">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={index} className="day-label">{day}</div>
                ))}
            </div>

            {viewMode === 'month' ? (
                <MonthView days={days} currentMonth={currentDate.getMonth()} />
            ) : (
                <WeekView days={weekDays} currentMonth={currentDate.getMonth()} />
            )}
        </section>
    );
};

export default Calendar;
