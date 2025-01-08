import Event from "@/Calendar/day/Event.tsx";
import {IEvent} from "@/interfaces/event.interface.ts";
import {formatDateTitle} from "@/lib/tools/formateDate";


interface Props {
    event: IEvent
}

function FoundElement({event}: Props) {

    const day = new Date(String(event.day)).getDate()
    // const day = new Date(String(event.day)).toDateString().toLocaleString()
    // const month = new Date(day).getMonth()


    return (
        <div
            className="found-element"
        >
            <Event event={event}/>
            <p>{`${day} ${formatDateTitle(new Date(String(event.day)))}`}</p>
        </div>
    )
}


export default FoundElement;
