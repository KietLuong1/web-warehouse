import { useQuery } from "@tanstack/react-query";
import fetchListInventorys from "./api";

export const useGetListInventorys = () => {
    return useQuery({
        queryKey: ['inventory'],
        queryFn: fetchListInventorys
    })
}