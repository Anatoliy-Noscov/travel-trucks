import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    const { page = 1, limit = 4, ...filters } = params;
    
    const response = await api.get<Camper[]>('/campers');
    
    const apiData = response.data as any;
    const campersData = apiData.items || apiData;
    
    let filteredData = Array.isArray(campersData) ? campersData : [];
    
  
    
    // Фильтрация на фронтенде
    if (filters.location) {
      filteredData = filteredData.filter(camper => 
        camper.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.form) {
      filteredData = filteredData.filter(camper => 
        camper.form === filters.form
      );
    }
    
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
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return filteredData.slice(0, endIndex);
  },

  getCamperById: async (id: string): Promise<Camper> => {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
  },
};