import { create } from 'zustand';
import { campersApi } from '@/services/campersApi';
import { Camper, FilterParams } from '@/types/campers';

interface CampersState {
  campers: Camper[];
  filteredCampers: Camper[];
  isLoading: boolean;
  error: string | null;
  filters: FilterParams;
  currentPage: number;
  hasMore: boolean;
  totalCount: number;
  
  fetchCampers: (params?: FilterParams, reset?: boolean) => Promise<void>;
  fetchCamperById: (id: string) => Promise<Camper | null>;
  setFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
}

const initialFilters: FilterParams = {
  location: '',
  form: '',
  AC: false,
  kitchen: false,
  TV: false,
  bathroom: false,
  transmission: '',
  page: 1,
  limit: 4,
};

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  filteredCampers: [],
  isLoading: false,
  error: null,
  filters: initialFilters,
  currentPage: 1,
  hasMore: true,
  totalCount: 0,

  fetchCampers: async (params = {}, reset = false) => {
    set({ isLoading: true, error: null });
    
    try {
      const currentFilters = get().filters;
      const newFilters = reset ? { ...initialFilters, ...params } : { ...currentFilters, ...params };
      
      const response = await campersApi.getCampers(newFilters);
      
      // Для MockAPI определяем hasMore по количеству полученных элементов
      const receivedCount = response.length;
      const limit = newFilters.limit || 4;
      
      set({
        filteredCampers: response,
        filters: newFilters,
        isLoading: false,
        currentPage: 1,
        hasMore: receivedCount >= limit, // Если получили меньше limit - это последняя страница
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch campers', 
        isLoading: false 
      });
    }
  },

  fetchCamperById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const camper = await campersApi.getCamperById(id);
      set({ isLoading: false });
      return camper;
    } catch (error) {
      set({ 
        error: 'Failed to fetch camper details', 
        isLoading: false 
      });
      return null;
    }
  },

  setFilters: (filters: FilterParams) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },

  loadMore: async () => {
    const { filters, currentPage, filteredCampers } = get();
    
    set({ isLoading: true });
    
    try {
      const nextPage = currentPage + 1;
      const response = await campersApi.getCampers({
        ...filters,
        page: nextPage,
      });

      if (response.length > 0) {
        const limit = filters.limit || 4;
        const allCampers = [...filteredCampers, ...response];
        
        // Убираем дубликаты по ID
        const uniqueCampers = allCampers.filter((camper, index, self) => 
          index === self.findIndex(c => c.id === camper.id)
        );
        
        set({
          filteredCampers: uniqueCampers,
          currentPage: nextPage,
          hasMore: response.length >= limit,
          isLoading: false,
        });
      } else {
        set({ hasMore: false, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: 'Failed to load more campers', 
        isLoading: false 
      });
    }
  },
}));