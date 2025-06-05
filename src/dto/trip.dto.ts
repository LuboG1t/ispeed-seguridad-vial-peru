export interface CreateTripDto {
    startDate: string;
    endDate?: string;
    origin: string;
    destination: string;
    status: string;
}

export interface Trip {
    id: string;
    startDate: string;
    endDate: string;
    origin: string;
    destination: string;
    companyId: string;
    status?: "IN_PROGRESS" | "FINISHED";
}

export interface GetAllTripsDto {
    startDate: string;
    endDate: string;
    origin: string;
    destination: string;
    status: string;
}