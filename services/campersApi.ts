import { api } from './api';
import { Camper, FilterParams } from '@/types/campers';

interface ApiResponse {
  total: number;
  items: Camper[];
}

export const campersApi = {
  getCampers: async (params: FilterParams = {}): Promise<Camper[]> => {
    console.log('🔄 Fetching ALL campers from API');

    try {
      // Делаем запрос БЕЗ пагинационных параметров, чтобы получить все данные
      const response = await api.get<ApiResponse>('/campers');
      
      // API возвращает объект с полями total и items
      const apiData = response.data;
      const campersData = apiData?.items || [];

      console.log('📋 API Response:', {
        status: response.status,
        dataStructure: apiData,
        itemsCount: campersData.length,
        firstItem: campersData[0]
      });

      
      console.log(`✅ Received ${campersData.length} campers total`);
      
      return campersData;
    } catch (error: any) {
      console.error('❌ Error fetching campers from API:', {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url
      });
      
      // Fallback: пытаемся получить данные напрямую
      try {
        console.log('🔄 Trying direct fetch as fallback...');
        const directResponse = await fetch('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
        if (directResponse.ok) {
          const data = await directResponse.json();
          const items = data.items || data || [];
          console.log(`✅ Fallback successful: received ${items.length} campers`);
          return items;
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