import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    const response = await api.get<Camper[]>('/campers', { params });
    return response.data;
  },

  getCamperById: async (id: string): Promise<Camper> => {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
  },
};