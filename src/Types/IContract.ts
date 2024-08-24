export interface IContract {
    contract_id: string;
    provider_id: string;
    contract_number: string;
    purpose: string;
    contractual_obligations: string;
    total_value: string;
    monthly_value: string;
    duration: string;
    start_date: string;
    end_date: string;
    status: string;
    early_termination_date?: Date | null; // Opcional, ya que puede ser nulo
    supervisor_id: string;
    created_at: Date;
    updated_at: Date;
}