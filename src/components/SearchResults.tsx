import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/Places";

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRoutesBetweenPoints } = useContext(MapContext);
  const [activePlaceID, setActivePlaceID] = useState('');
  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;
    setActivePlaceID(place.id);
    map?.flyTo({
      zoom: 15,
      center: [lng, lat],
    });
  };
  const getRoute = (place: Feature) =>{
    if(!userLocation) return
    const [lng, lat] = place.center;
    getRoutesBetweenPoints(userLocation, [lng, lat])
  }

  if (places.length === 0) return <></>;
  if (isLoadingPlaces) return <div>Cargando...</div>;
  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          onClick={() => onPlaceClick(place)}
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${activePlaceID === place.id ? "active" : ""}`}
        >
          <h6>{place.text}</h6>
          <p style={{ fontSize: "12px" }} className="text-muted">
            {place.place_name}
          </p>
          <button onClick={()=>getRoute(place)} className={`btn  btn-sm ${activePlaceID === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}>
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
