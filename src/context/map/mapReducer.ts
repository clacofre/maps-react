/* eslint import/no-webpack-loader-syntax: off */
import { MapState } from './MapProvider';
// @ts-ignore
import { Map, Marker } from '!mapbox-gl';

type MapActionType = 
   | { type: '[Map] - setMap', payload: Map } 
   | { type: '[Map] - setMarker', payload: Marker[] } 


export const mapReducer = ( state: MapState, action: MapActionType ): MapState => {

   switch (action.type) {
      case '[Map] - setMap':
         return {
            ...state,
            isMapReady: true,
            map: action.payload
          }
      case '[Map] - setMarker':
         return {
            ...state,
            markers: action.payload
          }

       default:
          return state;
   }

}