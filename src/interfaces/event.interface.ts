export interface IEvent {
    id?: number
    event: string
    priority: string
    day?: Date | string
    order?: number
    isHoliday?: boolean
}
