import { createContext } from 'react';
import { Feature } from '../../interfaces/Places';


export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    places: Feature[];
    isLoadingPlaces: boolean;
    /* METHODS */
    searchPlacesByTerm: (term: string) => Promise<Feature[]>;

}


export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps );