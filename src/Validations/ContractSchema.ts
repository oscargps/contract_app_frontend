import { z } from "zod";

export const ContractSchema = z.object({
    provider_id: z.string(),
    contract_number: z.string(),
    purpose: z.string(),
    contractual_obligations: z.string(),
    total_value: z.string(),
    monthly_value: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    status: z.string(),
    supervisor_id: z.string(),

})