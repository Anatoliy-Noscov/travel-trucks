export interface GalleryImage {
  thumb: string;
  original: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  adults: number;
  children: number;
  engine: string;
  transmission: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  description: string;
  gallery: GalleryImage[]; 
  reviews: Review[];
  details: Details;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
}

export interface Review {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export interface Details {
    form: string;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
}

export interface Features {
    airConditioner: number;
    bathroom: number;
    kitchen: number;
    TV: number;
    radio: number;
    refrigerator: number;
    microwave: number;
    gas: number;
    water: number;
}

export interface FilterParams {
    location?: string;
    form?: string;
    AC?: boolean;
    kitchen?: boolean;
    TV?: boolean;
    bathroom?: boolean;
    transmission?: string;
    page?: number;
    limit?: number;
  }

  