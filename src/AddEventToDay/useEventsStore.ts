import {create} from 'zustand'
import {IEvent} from "@/interfaces/event.interface.ts";

interface Context {
    isOpen: boolean
    payload?: Date | string
    type?: "add" | "edit"
    id?: number
    editEvent?: IEvent | null
}


interface EventStore {
    eventModalContext: Context;
    setContextEventModal: (value: Context) => void
    events: IEvent[]
    setEvents: (event: IEvent) => void
    setUpdateEvent: (event: IEvent) => void
    setHolidayToEvents: (holidays: IEvent[]) => void

}


export const useEventStore = create<EventStore>((set) => ({
    eventModalContext: {isOpen: false, payload: "", type: "add", editEvent: null},
    setContextEventModal: (value) => set({eventModalContext: value}),
    events: [],
    setEvents: (event: IEvent) => set((state) => ({events: [...state.events, event]})),
    setUpdateEvent: (event: IEvent) => set((state) => ({
        events: state.events.map(existEvent => existEvent.id === event.id ? {...existEvent, ...event} : existEvent),
    })),
    setHolidayToEvents: (holidays: IEvent[]) => set((state) => ({events: [...state.events, ...holidays]})),
}))
