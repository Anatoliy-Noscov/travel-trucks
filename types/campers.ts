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
 gallery: string[];
 reviews: Review[];
 details: Details;
 features: Features;
 AC: boolean;
 bathroom: boolean;
 kitchen: boolean;
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
    airConditioner?: boolean;
    kitchen?: boolean;
    TV?: boolean;
    radio?: boolean;
    refrigerator?: boolean;
    microwave?: boolean;
    gas?: boolean;
    water?: boolean;
    page?: number;
    limit?: number;
}

// export interface Camper {
//     id: string;
//     name: string;
//     price: number;
//     location: string;
//     description: string;
//     adults: number;
//     engine: string;
//     transmission: string;
//     AC: boolean;
//     bathroom: boolean;
//     kitchen: boolean;
//     TV: boolean;
//     radio: boolean;
//     refrigerator: boolean;
//     microwave: boolean;
//     gas: boolean;
//     water: boolean;
//     form: string;
//     length: string;
//     width: string;
//     height: string;
//     tank: string;
//     consumption: string;
//     reviews: Review[];
//     gallery: string[];
//   }
  