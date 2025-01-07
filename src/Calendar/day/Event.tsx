import './Event.css'
import {IEvent} from "@/interfaces/event.interface.ts";
import {memo} from "react";

interface Props {
    event: IEvent

}

function Event({event}: Props) {

    return (
        <>
            <hr className={`priority ${event.priority.toLowerCase()}`}/>
            <p>
                {event.event}
            </p>
        </>
    )
}

export default memo(Event)
