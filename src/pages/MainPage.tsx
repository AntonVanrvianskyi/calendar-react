import Calendar from "@/Calendar";
import AddEventToDay from "@/AddEventToDay";
import {useQuery} from "@tanstack/react-query";
import {getPublicHolidays} from "@/domain/holiday";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import {useEffect} from "react";


function MainPage() {
    const setHolidays = useEventStore(state => state.setHolidayToEvents)
    const {data} = useQuery({
        queryKey: ['public-holiday'],
        queryFn: () => getPublicHolidays({countryCode: "UA", year: "2025"}),
    })

    useEffect(() => {
        if(data?.data) {
            const mapped = data.data.map((holiday) => {
                return {
                    event: holiday.localName,
                    day: new Date(holiday.date).toString(),
                    priority: "high"
                }
            })
            setHolidays(mapped)
        }
    }, [data?.data]);

    return (
        <>
            <Calendar/>
            <AddEventToDay/>
        </>
    )
}

export default MainPage
