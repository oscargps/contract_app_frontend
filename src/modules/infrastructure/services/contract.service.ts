import { RequestService } from "../../../helpers/request-service";
import CONFIG from "../../../../config";

export class ContractService {
    async getContract(criteria: string, data: string) {
        return await RequestService({
            url: `${CONFIG.URL}contracts/get-contract`,
            method: "GET",
            headers: { "search-criteria": criteria, "search-data": data },
        });
    }
}
