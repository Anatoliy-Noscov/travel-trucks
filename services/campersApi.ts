import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

interface ApiResponse {
  total: number;
  items: Camper[];
}

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    const { page = 1, limit = 4, ...filters } = params;

    // Создаем query параметры для API
    const queryParams: any = {
      page,
      limit,
    };

    // Добавляем фильтры только если они есть
    if (filters.location && filters.location.trim() !== '') {
      queryParams.location = filters.location;
    }

    if (filters.form && filters.form.trim() !== '') {
      queryParams.form = filters.form;
    }

    // Для boolean фильтров передаем как строки
    if (filters.AC) queryParams.AC = 'true';
    if (filters.kitchen) queryParams.kitchen = 'true';
    if (filters.TV) queryParams.TV = 'true';
    if (filters.bathroom) queryParams.bathroom = 'true';
    
    if (filters.transmission && filters.transmission.trim() !== '') {
      queryParams.transmission = filters.transmission;
    }

    console.log('🔄 Fetching campers from API with params:', queryParams);

    try {
      const response = await api.get<ApiResponse>('/campers', { 
        params: queryParams 
      });
      
      // API возвращает объект с полями total и items
      const apiData = response.data;
      const campersData = apiData?.items || [];
      
      console.log(`✅ Received ${campersData.length} campers for page ${page}, total: ${apiData?.total || 0}`);
      
      return campersData;
    } catch (error: any) {
      console.error('❌ Error fetching campers from API:', {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url
      });
      
      // Если API недоступен, используем fallback - делаем запрос напрямую
      try {
        console.log('🔄 Trying direct fetch as fallback...');
        const directResponse = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?page=${page}&limit=${limit}`);
        if (directResponse.ok) {
          const data = await directResponse.json();
          console.log(`✅ Fallback successful: received ${data.items?.length || 0} campers`);
          return data.items || data || [];
        }
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
      }
      
      return [];
    }
  },

  getCamperById: async (id: string): Promise<Camper> => {
    try {
      const response = await api.get<Camper>(`/campers/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching camper ${id}:`, error);
      
      // Fallback для деталей кемпера
      try {
        const directResponse = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        if (directResponse.ok) {
          return await directResponse.json();
        }
      } catch (fallbackError) {
        console.error('Fallback for camper details failed:', fallbackError);
      }
      
      throw error;
    }
  },
};