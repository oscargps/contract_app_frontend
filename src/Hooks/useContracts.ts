import { useMutation, useQuery } from '@tanstack/react-query';
import { ContractController } from '../modules/infrastructure/controllers/contract.controller';
import { IContract } from '../Types/IContract';

const contractController = new ContractController();

export const useGetContract = (criteria: string, data: string) => {
    const getData = () => contractController.getContracts(criteria, data);

    return useQuery({
        queryKey: ['Contracts'],
        queryFn: () => getData(),
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: false,
        gcTime: 0
    })
};

export const useCreateContract = () => useMutation({
    mutationFn: (contract: IContract) => {
        return contractController.createContract(contract);
    },
})