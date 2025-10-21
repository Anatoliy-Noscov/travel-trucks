import { create } from 'zustand';
import { campersApi } from '@/services/campersApi';
import { Camper, FilterParams } from '@/types/campers';

interface CampersState {
  campers: Camper[]; // Все кемперы с сервера
  isLoading: boolean;
  error: string | null;
  filters: FilterParams;
  
  fetchCampers: () => Promise<void>;
  fetchCamperById: (id: string) => Promise<Camper | null>;
  setFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
  getFilteredCampers: () => Camper[]; // Фильтрация на клиенте
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
      
      console.log(`📊 Store: loaded ${campers.length} campers total`);
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

  getFilteredCampers: () => {
    const { campers, filters } = get();
    
    let filtered = [...campers];

    // Фильтр по локации
    if (filters.location && filters.location.trim() !== '') {
      filtered = filtered.filter(camper => 
        camper.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Фильтр по типу транспортного средства
    if (filters.form && filters.form.trim() !== '') {
      filtered = filtered.filter(camper => camper.form === filters.form);
    }

    // Фильтр по трансмиссии
    if (filters.transmission && filters.transmission.trim() !== '') {
      filtered = filtered.filter(camper => camper.transmission === filters.transmission);
    }

    // Фильтр по оборудованию
    if (filters.AC) {
      filtered = filtered.filter(camper => camper.AC);
    }
    if (filters.kitchen) {
      filtered = filtered.filter(camper => camper.kitchen);
    }
    if (filters.TV) {
      filtered = filtered.filter(camper => camper.TV);
    }
    if (filters.bathroom) {
      filtered = filtered.filter(camper => camper.bathroom);
    }

    console.log(`🔍 Filters applied: ${filtered.length} matches from ${campers.length} total`);
    return filtered;
  },
}));