import Calendar from "@/Calendar";
import AddEventToDay from "@/AddEventToDay";
import {useQuery} from "@tanstack/react-query";
import {getPublicHolidays} from "@/domain/holiday";


function MainPage() {

    const {data} = useQuery({
        queryKey: ['public-holiday'],
        queryFn: () => getPublicHolidays({countryCode: "UA", year: "2025"})

    })

    return (
        <>
            <Calendar/>
            <AddEventToDay/>
        </>
    )
}

export default MainPage
