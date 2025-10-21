import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

interface ApiResponse {
  total: number;
  items: Camper[];
}

export const campersApi = {
  getCampers: async (params: FilterParams = {}, page: number = 1, limit: number = 4): Promise<{items: Camper[], total: number}> => {
    console.log('🔄 Fetching campers with params:', { params, page, limit });

    try {
      const response = await api.get<ApiResponse>('/campers');
      const allCampers = response.data?.items || [];
      
      console.log(`✅ Loaded ${allCampers.length} campers from API`);

      // ФИЛЬТРАЦИЯ НА ФРОНТЕНДЕ
      let filteredCampers = [...allCampers];
      
      // Фильтр по локации
      if (params.location && params.location.trim() !== '') {
        filteredCampers = filteredCampers.filter(camper => 
          camper.location.toLowerCase().includes(params.location!.toLowerCase())
        );
      }
      
      // Фильтр по типу транспортного средства
      if (params.form && params.form.trim() !== '') {
        // Преобразуем значения фильтров в реальные значения из данных
        let formValue = params.form;
        if (params.form === 'van') {
          formValue = 'panelTruck'; // В данных 'van' называется 'panelTruck'
        }
        filteredCampers = filteredCampers.filter(camper => camper.form === formValue);
      }
      
      // Фильтр по трансмиссии
      if (params.transmission && params.transmission.trim() !== '') {
        filteredCampers = filteredCampers.filter(camper => camper.transmission === params.transmission);
      }
      
      // Фильтр по оборудованию
      if (params.AC) {
        filteredCampers = filteredCampers.filter(camper => camper.AC);
      }
      if (params.kitchen) {
        filteredCampers = filteredCampers.filter(camper => camper.kitchen);
      }
      if (params.TV) {
        filteredCampers = filteredCampers.filter(camper => camper.TV);
      }
      if (params.bathroom) {
        filteredCampers = filteredCampers.filter(camper => camper.bathroom);
      }

      // ПАГИНАЦИЯ НА ФРОНТЕНДЕ
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCampers = filteredCampers.slice(startIndex, endIndex);
      
      console.log(`🔍 Frontend filtering: ${filteredCampers.length} matches, showing ${paginatedCampers.length} on page ${page}`);
      console.log('📋 Available form values:', [...new Set(allCampers.map(c => c.form))]);
      
      return {
        items: paginatedCampers,
        total: filteredCampers.length
      };
    } catch (error: any) {
      console.error('❌ Error fetching campers:', error);
      return { items: [], total: 0 };
    }
  },

  getCamperById: async (id: string): Promise<Camper> => {
    try {
      const response = await api.get<Camper>(`/campers/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching camper ${id}:`, error);
      throw error;
    }
  },
};