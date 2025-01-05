import {create} from 'zustand'

interface Context {
    isOpen: boolean
    payload: Date | string
}

interface Event {
    id: Date | string
    event: string
    priority: string
}

interface EventStore {
    eventModalContext: Context;
    setContextEventModal: (value: Context) => void
    events: Event[]
    setEvents: (event: Event) => void
}


export const useEventStore = create<EventStore>((set) => ({
    eventModalContext: {isOpen: false, payload: ""},
    setContextEventModal: (value) => set({eventModalContext: value}),
    events: [],
    setEvents: (event: Event) => set((state) => ({events: [...state.events, event]})),
}))
