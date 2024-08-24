import { RequestService } from "../../../helpers/request-service";
import CONFIG from "../../../../config";
import { IContract } from "../../../Types/IContract";

export class ContractService {
    async getContract(criteria: string, data: string) {
        try {
            return await RequestService({
                url: `${CONFIG.URL}contracts/get-contract`,
                method: "GET",
                headers: { "search-criteria": criteria, "search-data": data },
            });
        } catch (error) {
            throw error
        }
    }
    async getContractExtension(contract_id: string) {
        try {
            return await RequestService({
                url: `${CONFIG.URL}contracts/get-contract-extensions`,
                method: "GET",
                headers: { "contract-id": contract_id },
            });
        } catch (error) {
            throw error
        }
    }
    async createContract(data: IContract) {
        try {
            return await RequestService({
                url: `${CONFIG.URL}contracts/create`,
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
        } catch (error) {
            throw error
        }
    }
    async getLists() {
        try {
            return await RequestService({
                url: `${CONFIG.URL}contracts/get-lists`,
                method: "GET",
                headers: {},
            });
        } catch (error) {
            throw error
        }
    }
}
