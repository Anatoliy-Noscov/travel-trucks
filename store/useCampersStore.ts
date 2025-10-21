import { create } from 'zustand';
import { campersApi } from '@/services/campersApi';
import { Camper, FilterParams } from '@/types/campers';

interface CampersState {
  campers: Camper[];
  isLoading: boolean;
  error: string | null;
  filters: FilterParams;
  
  fetchCampers: () => Promise<void>;
  fetchCamperById: (id: string) => Promise<Camper | null>;
  setFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
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

  fetchCampers: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const campers = await campersApi.getCampers();
      set({
        campers,
        isLoading: false,
      });
      
      console.log(`✅ Loaded ${campers.length} campers from API`);
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
}));