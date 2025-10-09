import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    const {page, limit, ...filters} = params;

    const response = await api.get<Camper[]>('/campers', { params: filters});

    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return response.data.slice(0, endIndex);
    }

    return response.data;
  },

  getCamperById: async (id: string): Promise<Camper> => {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
  },
};