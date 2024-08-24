import { useQuery } from '@tanstack/react-query';
import { ContractController } from '../modules/infrastructure/controllers/contract.controller';

const contractController = new ContractController();

export const useGetLists = () => {
    const getData = () => contractController.getLists();

    return useQuery({
        queryKey: ['Lists'],
        queryFn: () => getData(),
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        gcTime: 0
    })
};