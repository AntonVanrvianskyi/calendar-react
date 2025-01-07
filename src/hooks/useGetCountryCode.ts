import {getCountryCode} from "@/domain/country-code";
import {useQuery} from "@tanstack/react-query";
import {useState, useEffect} from "react";
import {getPublicHolidays} from "@/domain/holiday";

interface Props {
    year: number;
}

export const useGetCountryCode = ({year}: Props) => {
    const [countryCode, setCountryCode] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                try {
                    const response = await getCountryCode({latitude, longitude});
                    if (response.status === 200) {
                        const country = response.data.results[0]?.components.country_code || "UA";
                        setCountryCode(country);
                    }
                } catch (error) {
                    console.error("Geocoding error:", error);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
            }
        );
    }, []);
    console.log(countryCode, "countryCode");
    const {data, isLoading, isSuccess, isError} = useQuery({
        queryKey: ['public-holiday', countryCode, year],
        queryFn: () => getPublicHolidays({ countryCode: String(countryCode) || "UA", year: String(year) }),
        enabled: !!countryCode,
    })



    return { data, isLoading, isSuccess, isError };

};
