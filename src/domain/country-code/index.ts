import {geoApi} from "@/lib/intagrations/axios";
import {AxiosResponse} from "axios";

const API_KEY = import.meta.env.VITE_PUBLIC_MAP_KEY || ""

interface Props {
    latitude: number
    longitude: number
}

interface Results {
     components: { country_code: string, continent: string}
}

interface CountryResponse {
    results: Results[]
    status: number
}

export const getCountryCode = ({longitude, latitude}: Props): Promise<AxiosResponse<CountryResponse>> => {
    return geoApi.get(`/json?q=${latitude}+${longitude}&key=${API_KEY}`)
}
