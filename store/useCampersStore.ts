import { create } from 'zustand';
import { campersApi } from '@/services/campersApi';
import { Camper, FilterParams } from '@/types/campers';

interface CampersState {
  campers: Camper[];
  isLoading: boolean;
  error: string | null;
  filters: FilterParams;
  currentPage: number;
  hasMore: boolean;
  totalCampers: number;
  
  fetchCampers: (reset?: boolean) => Promise<void>;
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
};

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  isLoading: false,
  error: null,
  filters: initialFilters,
  currentPage: 1,
  hasMore: false,
  totalCampers: 0,

  fetchCampers: async (reset: boolean = false) => {
    set({ isLoading: true, error: null });
    
    try {
      const { filters } = get();
      const page = reset ? 1 : get().currentPage;
      
      const response = await campersApi.getCampers(filters, page, 4);
      
      const newCampers = reset ? response.items : [...get().campers, ...response.items];
      const hasMore = newCampers.length < response.total;
      
      set({
        campers: newCampers,
        isLoading: false,
        currentPage: reset ? 1 : page,
        hasMore,
        totalCampers: response.total
      });
      
      console.log(`✅ ${reset ? 'Filtered' : 'Loaded'}: ${response.items.length} campers, total: ${newCampers.length}/${response.total}, hasMore: ${hasMore}`);
    } catch (error) {
      set({ 
        error: 'Failed to fetch campers', 
        isLoading: false,
        campers: []
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
    const { currentPage, isLoading } = get();
    
    if (isLoading || !get().hasMore) return;
    
    set({ isLoading: true });
    
    try {
      const nextPage = currentPage + 1;
      const { filters } = get();
      
      const response = await campersApi.getCampers(filters, nextPage, 4);
      
      const newCampers = [...get().campers, ...response.items];
      const hasMore = newCampers.length < response.total;
      
      set({
        campers: newCampers,
        currentPage: nextPage,
        hasMore,
        isLoading: false
      });
      
      console.log(`📄 Load more: page ${nextPage}, showing ${newCampers.length}/${response.total}, hasMore: ${hasMore}`);
    } catch (error) {
      console.error('❌ Error loading more campers:', error);
      set({ 
        error: 'Failed to load more campers', 
        isLoading: false 
      });
    }
  },
}));