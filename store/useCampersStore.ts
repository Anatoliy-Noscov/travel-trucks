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
  
  // Actions
  fetchCampers: (params?: FilterParams, reset?: boolean) => Promise<void>;
  fetchCamperById: (id: string) => Promise<Camper | null>;
  setFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
}

const initialFilters: FilterParams = {
  location: '',
  form: '',
  airConditioner: false,
  kitchen: false,
  TV: false,
  radio: false,
  refrigerator: false,
  microwave: false,
  gas: false,
  water: false,
  page: 1,
  limit: 4, // По макету - 4 карточки на странице
};

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
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
      const newFilters = reset ? { ...initialFilters, ...params } : { ...currentFilters, ...params };
      
      const response = await campersApi.getCampers(newFilters);
      
      set({
        filteredCampers: response,
        filters: newFilters,
        isLoading: false,
        currentPage: 1,
        hasMore: response.length === newFilters.limit,
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
        set({
          filteredCampers: [...filteredCampers, ...response],
          currentPage: nextPage,
          hasMore: response.length === filters.limit,
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