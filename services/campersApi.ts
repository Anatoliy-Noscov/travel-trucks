import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

interface MockApiResponse {
  items?: Camper[];
}

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    const { page = 1, limit = 4, ...filters } = params;

    const queryParams = {
      page,
      limit,
      ...(filters.location && { location: filters.location }),
      ...(filters.form && { form: filters.form }),
    };

    const response = await api.get<Camper[] | MockApiResponse>('/campers', { 
      params: queryParams 
    });
    
    const apiData = response.data;
    const campersData = Array.isArray(apiData) 
      ? apiData 
      : (apiData as MockApiResponse).items || [];
    
    let filteredData = Array.isArray(campersData) ? campersData : [];
    
    if (filters.AC) {
      filteredData = filteredData.filter(camper => camper.AC);
    }
    
    if (filters.kitchen) {
      filteredData = filteredData.filter(camper => camper.kitchen);
    }
    
    if (filters.TV) {
      filteredData = filteredData.filter(camper => camper.TV);
    }
    
    if (filters.bathroom) {
      filteredData = filteredData.filter(camper => camper.bathroom);
    }
    
    if (filters.transmission) {
      filteredData = filteredData.filter(camper => 
        camper.transmission === filters.transmission
      );
    }
    
    return filteredData;
  },

  getCamperById: async (id: string): Promise<Camper> => {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
  },
};