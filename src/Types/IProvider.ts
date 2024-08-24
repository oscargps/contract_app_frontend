export interface IProvider {
    provider_id: number;
    document_type: string;
    document_number: string;
    full_name: string;
    email: string;
    phone: string | null;
    registration_date: Date;
}