import { create } from 'zustand';
import { campersApi } from '@/services/campersApi';
import { Camper, FilterParams } from '@/types/campers';

interface CampersState {
  filteredCampers: Camper[];
  isLoading: boolean;
  error: string | null;
  filters: FilterParams;
  currentPage: number;
  hasMore: boolean;
  
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
  filteredCampers: [],
  isLoading: false,
  error: null,
  filters: initialFilters,
  currentPage: 1,
  hasMore: true,

  fetchCampers: async (params = {}, reset = false) => {
    set({ isLoading: true, error: null });
    
    try {
      const currentFilters = get().filters;
      const newFilters = reset ? { ...initialFilters, ...params, page: 1 } : { ...currentFilters, ...params };
      
      const response = await campersApi.getCampers(newFilters);
      
      const receivedCount = response.length;
      const limit = newFilters.limit || 4;
      
      set({
        filteredCampers: response,
        filters: newFilters,
        isLoading: false,
        currentPage: newFilters.page || 1,
        hasMore: receivedCount === limit, // Если получили полную страницу, значит есть еще данные
      });
      
      console.log(`📊 Store: received ${receivedCount}, hasMore: ${receivedCount === limit}`);
    } catch (error) {
      set({ 
        error: 'Failed to fetch campers', 
        isLoading: false,
        filteredCampers: []
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
    
    if (get().isLoading || !get().hasMore) return;
    
    set({ isLoading: true });
    
    try {
      const nextPage = currentPage + 1;
      console.log(`🔄 Loading more: page ${nextPage}`);
      
      const response = await campersApi.getCampers({
        ...filters,
        page: nextPage,
      });

      const receivedCount = response.length;
      const limit = filters.limit || 4;
      
      if (response.length > 0) {
        const allCampers = [...filteredCampers, ...response];
        
        set({
          filteredCampers: allCampers,
          currentPage: nextPage,
          hasMore: receivedCount === limit,
          isLoading: false,
        });
        
        console.log(`✅ Loaded more: ${response.length} campers, total: ${allCampers.length}`);
      } else {
        set({ 
          hasMore: false, 
          isLoading: false 
        });
        console.log('🏁 No more campers to load');
      }
    } catch (error) {
      console.error('❌ Error loading more campers:', error);
      set({ 
        error: 'Failed to load more campers', 
        isLoading: false 
      });
    }
  },
}));