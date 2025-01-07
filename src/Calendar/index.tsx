import React, {useEffect, useMemo, useState} from 'react';
import './index.css';
import MonthView from "@/Calendar/month";
import WeekView from "@/Calendar/weak";
import {useGenerateMonth} from "@/hooks/useGenerateMonth.ts";
import {useGenerateWeekDays} from "@/hooks/useGenerateWeekDays.ts";
import {useGetCountryCode} from "@/hooks/useGetCountryCode.ts";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import {formatDateTitle} from "@/lib/tools/formateDate";

type ViewMode = 'month' | 'week';
const views: ViewMode[] = ['month', 'week'];


const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const setHolidays = useEventStore(state => state.setHolidayToEvents)
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [days] = useGenerateMonth(currentDate)
    const [weekDays] = useGenerateWeekDays(currentDate)
    const {data, isSuccess} = useGetCountryCode({year: currentDate.getFullYear()})
    const holidays = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map((holiday) => ({
            event: holiday.localName,
            day: new Date(holiday.date).toString(),
            priority: "",
            isHoliday: true,
            id: new Date().getTime(),
        }));
    }, [data?.data]);

    useEffect(() => {
        setHolidays(Array.from(new Set(holidays)));
    }, [isSuccess]);

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
                <h2 className="calendar-title">{formatDateTitle(currentDate)}</h2>
                <button className="nav-button" onClick={() => changeDate('next')}>&gt;</button>

                <div className="view-switcher">
                    {views.map((view) => (
                        <button
                            key={view}
                            className={`view-button ${viewMode === view ? 'active' : ''}`}
                            onClick={() => setViewMode(view)}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <div className="day-labels">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={index} className="day-label">{day}</div>
                ))}
            </div>

            {viewMode === 'month' ? (
                <MonthView days={days} currentMonth={currentDate.getMonth()}/>
            ) : (
                <WeekView days={weekDays} currentMonth={currentDate.getMonth()}/>
            )}
        </section>
    );
};

export default Calendar;
