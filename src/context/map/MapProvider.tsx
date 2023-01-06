/* eslint import/no-webpack-loader-syntax: off */
import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
// @ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/Directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarker: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`<h6>${place.text}</h6>
        <p>${place.place_name}</p>`);
      const newMarket = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);
      newMarker.push(newMarket);
    }
    // limpiar polylines
    dispatch({ type: "[Map] - setMarker", payload: newMarker });
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
            <h4>Aqui estoy</h4>
            <p>En algun lugar de la tierra</p>
        `);
    new Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    dispatch({
      type: "[Map] - setMap",
      payload: map,
    });
  };
  const getRoutesBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { duration, distance, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    state.map?.fitBounds(bounds, { padding: 200 });
    /* POLYLINE */
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };
    if(state.map?.getLayer('RouteString')){
        state.map?.removeLayer('RouteString');
        state.map?.removeSource('RouteString');
        
    }
    state.map?.addSource("RouteString", sourceData);
    state.map?.addLayer({
        id: "RouteString",
        type: "line",
        source: "RouteString",
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-color": "#61DAFB",
            "line-width": 3,
        },
    });
  };
  return (
    <MapContext.Provider
      value={{
        ...state,
        /* METHODS */
        setMap,
        getRoutesBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
