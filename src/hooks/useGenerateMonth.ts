import { useMemo } from "react";
import { Day } from "@/interfaces/date.interface.ts";

export const useGenerateMonth = (currentDate: Date): Day[] => {
    return useMemo(() => {
        const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Генеруємо всі дні місяця
        const days: Day[] = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            days.push({ date: new Date(d), events: [] });
        }

        // Додаємо попередні дні, щоб початок місяця заповнив рядок
        const startDay = start.getDay();
        if (startDay > 0) {
            for (let i = 1; i <= startDay; i++) {
                const prevDate = new Date(start);
                prevDate.setDate(start.getDate() - i);
                days.unshift({ date: prevDate, events: [] });
            }
        }

        // Додаємо наступні дні, щоб заповнити останній рядок
        const endDay = end.getDay();
        if (endDay < 6) {
            for (let i = 1; i <= 6 - endDay; i++) {
                const nextDate = new Date(end);
                nextDate.setDate(end.getDate() + i);
                days.push({ date: nextDate, events: [] });
            }
        }

        return days;
    }, [currentDate]);
};
