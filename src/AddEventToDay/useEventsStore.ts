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
    reorderEvents: (draggedId: number, targetId: number, day: Date) => void;


}


export const useEventStore = create<EventStore>((set) => ({
    eventModalContext: {isOpen: false, payload: "", editEvent: null},
    setContextEventModal: (value) => set({eventModalContext: value}),
    events: [],
    setEvents: (newEvent: IEvent) => set((state) => {
        const dayEvents = state.events.filter((event) => event.day === newEvent.day);
        const nextOrder = dayEvents.length; // Визначення наступного порядку
        return {
            events: [...state.events, {...newEvent, order: nextOrder}],
        };
    }),
    setUpdateEvent: (event: IEvent) => set((state) => ({
        events: state.events.map(existEvent => existEvent.id === event.id ? {...existEvent, ...event} : existEvent),
    })),
    setHolidayToEvents: (holidays: IEvent[]) => set((state) => ({events: [...state.events, ...holidays]})),
    reorderEvents: (draggedId, targetId, day) =>
        set((state) => {
            const filteredEvents = state.events.filter((event) => event.day === day);
            const draggedIndex = filteredEvents.findIndex((event) => Number(event.id) === draggedId);
            const targetIndex = filteredEvents.findIndex((event) => Number(event.id) === targetId);
            if (draggedIndex === -1 || targetIndex === -1) return state;
            const updatedEvents = [...filteredEvents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            const foo = updatedEvents.splice(draggedIndex, 1);

            updatedEvents.splice(targetIndex, 0, foo[0]);
            updatedEvents.forEach((event, index) => {
                event.order = index;
            });

            const updatedStateEvents = state.events.map((event) => {
                const updatedEvent = updatedEvents.find((e) => e.id === event.id);
                return updatedEvent ? { ...event, ...updatedEvent } : event;
            });

            return {
                events: updatedStateEvents,
            };
        }),
}))
