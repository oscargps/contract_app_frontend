import { ContractService } from "../services/contract.service";
export class ContractController {

    private contractService: ContractService;

    constructor() {
        this.contractService = new ContractService
    }

    async getContracts(criteria: string, data: string) {
        const resp = await this.contractService.getContract(criteria, data);
        return resp
    }
}
