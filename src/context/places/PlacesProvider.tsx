import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/Places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}
const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const PlacesProvider = ({ children }: Props) => {
  const [placesState, dispatch] = useReducer(placesReducer, INITIAL_STATE);
  /*  */
  const getLocation = () => {
    getUserLocation().then(([longitude, latitude]) =>
      dispatch({
        type: "[Places] - setUserLocation",
        payload: [longitude, latitude],
      })
    );
  };
  /*  */

/*  */
  const searchPlacesByTerm = async(term: string)=>{
    if(term.length === 0){
      dispatch({type: "[Places] - setPlaces", payload: []});
      return []
    } 
    if(!placesState.userLocation) throw new Error("No hay ubicación");
    dispatch({type: "[Places] - setLoadingPlaces"});
    const resp = await searchApi.get<PlacesResponse>(`/${term}.json`,{
      params:{
        proximity:placesState.userLocation.join(","),
      }
    });
    dispatch({type: "[Places] - setPlaces", payload: resp.data.features});
    return resp.data.features
  }
/*  */
  useEffect(getLocation, []);
  return (
    <PlacesContext.Provider
      value={{
        ...placesState,
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
