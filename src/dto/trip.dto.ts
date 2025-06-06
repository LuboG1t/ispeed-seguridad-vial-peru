import { User } from "./user.dto";

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
    origin: Origin;
    destination: Destination;
    companyId: string;
    user?: User;
    status?: "IN_PROGRESS" | "FINISHED";
}

export interface GetAllTripsDto {
    startDate: string;
    endDate: string;
    origin: string;
    destination: string;
    status: string;
}

export interface Origin {
    id: string;
    name: string;
    address: string;
    companyId: string;
}

export interface Destination {
    id: string;
    name: string;
    address: string;
    companyId: string;
}