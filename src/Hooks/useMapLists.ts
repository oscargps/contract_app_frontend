import { useEffect } from "react";
import { useGetLists } from "./useGetLists";

export const useMapLists = (setProviders:any, setSupervisors:any, setCatalogs:any) => {

    const { data, isLoading } = useGetLists();
    useEffect(() => {
        if (!isLoading && data) {
            setProviders(data.providers);
            setSupervisors(data.supervisors);
            setCatalogs(data.catalogs);
        }
    }, [data]);
}

