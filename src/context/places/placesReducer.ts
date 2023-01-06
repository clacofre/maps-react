import { Feature } from '../../interfaces/Places';
import { PlacesState } from './PlacesProvider';


type PlacesActionType = 
   | { type: '[Places] - setUserLocation', payload: [number, number] } 
   | { type: '[Places] - setLoadingPlaces'} 
   | { type: '[Places] - setPlaces', payload: Feature[] } 


export const placesReducer = ( state: PlacesState, action: PlacesActionType ): PlacesState => {

   switch (action.type) {
      case '[Places] - setUserLocation':
         return {
            ...state,
            isLoading: false,
            userLocation: action.payload
          }
      case '[Places] - setLoadingPlaces':
         return {
            ...state,
            isLoadingPlaces: true,
            places: []
          }
      case '[Places] - setPlaces':
         return {
            ...state,
            isLoadingPlaces: false,
            places: action.payload
          }

       default:
          return state;
   }

}