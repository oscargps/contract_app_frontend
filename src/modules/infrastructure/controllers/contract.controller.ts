import { ContractService } from "../services/contract.service";
export class ContractController {

    private contractService: ContractService;

    constructor() {
        this.contractService = new ContractService
    }

    async getContracts(criteria: string, data: string) {
        try {
            return await this.contractService.getContract(criteria, data);
        } catch (error) {
            throw error
        }
    }
}
