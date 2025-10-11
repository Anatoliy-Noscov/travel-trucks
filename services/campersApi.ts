import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    const { page = 1, limit = 4, ...filters } = params;

    // MockAPI поддерживает только простые текстовые фильтры
    const queryParams: any = {
      page,
      limit,
    };
    
    // Добавляем только те фильтры, которые поддерживает MockAPI
    if (filters.location) {
      queryParams.location = filters.location;
    }

    if (filters.form) {
      queryParams.form = filters.form;
    }

    const response = await api.get<Camper[]>('/campers', { params: queryParams });
    
    // Обрабатываем ответ API
    const apiData = response.data as any;
    const campersData = apiData.items || apiData;
    
    let filteredData = Array.isArray(campersData) ? campersData : [];
    
    // Применяем булевые фильтры на фронтенде
    // (MockAPI не поддерживает фильтрацию по булевым полям)
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