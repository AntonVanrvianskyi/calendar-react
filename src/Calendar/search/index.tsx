import Modal from "@/designSystem/interactions/Modal";
import {CloseIcon} from "@/designSystem/icons";
import './index.css'
import EmptyBoxResult from "@/Calendar/search/EmptyBoxResult.tsx";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useEventStore} from "@/AddEventToDay/useEventsStore.ts";
import {debounce} from "lodash";
import FoundElement from "@/Calendar/search/FoundElement.tsx";


interface Props {
    onClose: () => void;
}

function SearchModal({onClose}: Props) {
    const events = useEventStore(state => state.events)
    const [searchQuery, setSearchQuery] = useState<string>("")

    const filteredEvents = useMemo(() => {
        return events.filter(event => event.event.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, events])

    const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchQuery(value);
    }, 300)

    useEffect(() => {
        return () => setSearchQuery("")
    }, [])

    return (
        <>
            <Modal>
                <div className="header-modal">
                    <h4>
                        Search
                    </h4>
                    <button
                        className="btn-close"
                        onClick={onClose}
                    >
                        <CloseIcon/>
                    </button>
                </div>
                <input
                    className="inp-search"
                    onChange={(e) => handleChange(e)}
                    placeholder="Search..."
                />
                {
                    !searchQuery || filteredEvents.length === 0 ? <EmptyBoxResult/> : null
                }
                {
                    filteredEvents.length > 0 && searchQuery &&
                    <div className="found-box">
                        {
                            filteredEvents.map((event) => (
                                <FoundElement key={event.id} event={event}/>
                            ))
                        }
                    </div>
                }
            </Modal>
        </>
    )
}

export default SearchModal;
