export interface ISupervisor {
    supervisor_id: number;
    full_name: string;
    email: string;
    phone: string | null;
    position: string | null;
    department: string | null;
    status: number;
    registration_date: Date;
    updated_at: Date;
}