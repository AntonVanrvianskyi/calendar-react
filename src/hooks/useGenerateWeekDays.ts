import {Day} from "@/interfaces/date.interface.ts";
//
//
// export const useGenerateWeekDays = (currentDate: Date): Day[][] => {
//     const start = new Date(currentDate);
//     start.setDate(currentDate.getDate() - currentDate.getDay());
//     const days: Day[] = [];
//
//     for (let i = 0; i < 7; i++) {
//         days.push({ date: new Date(start), events: []});
//         start.setDate(start.getDate() + 1);
//     }
//     return [days];
// }
import {useMemo} from "react";

export const useGenerateWeekDays = (currentDate: Date): Day[] => {
    return useMemo(() => {
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        const days: Day[] = [];
        for (let i = 0; i < 7; i++) {
            days.push({date: new Date(start), events: []});
            start.setDate(start.getDate() + 1);
        }
        console.log(days, 'days in loop');
        return days;
    }, [currentDate])

};
