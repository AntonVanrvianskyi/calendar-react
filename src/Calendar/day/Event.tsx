import './Event.css'
import {IEvent} from "@/interfaces/event.interface.ts";
import {MouseEvent, DragEvent} from "react";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";

interface Props {
    event: IEvent
    onDragStart: (event: DragEvent<HTMLDivElement>, eventData: IEvent) => void;

}

function Event({event, onDragStart}: Props) {
    const setOpenEventModal = useEventStore(state => state.setContextEventModal)
    const handleEventClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpenEventModal({isOpen: true, type:"edit", editEvent: event, id: event.id})
    }

    return (
        <>
            <div
                onClick={handleEventClick}
                className="event"
                draggable
                onDragStart={(e) => onDragStart(e, event)}
            >
                <hr className={`priority ${event.priority.toLowerCase()}`}/>
                <p>
                    {event.event}
                </p>
            </div>
        </>
    )
}

export default Event
