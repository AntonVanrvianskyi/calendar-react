import {api} from "@/lib/intagrations/axios";
import {AxiosResponse} from "axios";
import {Holiday} from "@/interfaces/holiday.interface.ts";


interface Props {
    year: string
    countryCode: string
}

export const getPublicHolidays = ({year, countryCode}: Props): Promise<AxiosResponse<Holiday[]>> => {
    return api.get(`/PublicHolidays/${year}/${countryCode}`,)
}
