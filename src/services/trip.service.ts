import apiClient from "@/api/axios";
import { CreateTripDto, GetAllTripsDto, Trip } from "@/dto/trip.dto";

export const createTrip = async (data: CreateTripDto): Promise<Trip> => {
    const response = await apiClient.post<Trip>('/trips', data, { withCredentials: true });
    return response.data;
}

export const getTrips = async (): Promise<GetAllTripsDto[]> => {
    const response = await apiClient.get<GetAllTripsDto[]>('/trips');
    return response.data;
};

export const getTripById = async (id: string): Promise<Trip> => {
    const response = await apiClient.get<Trip>(`/trips/${id}`);
    return response.data;
};

export const updateTrip = async (id: string, data: Partial<Trip>): Promise<Trip> => {
    const response = await apiClient.patch<Trip>(`/trips/${id}`, data);
    return response.data;
};

export const deleteTrip = async (id: string): Promise<void> => {
    await apiClient.delete(`/trips/${id}`);
};