import { RequestService } from "../../../helpers/request-service";
import CONFIG from "../../../../config";

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
