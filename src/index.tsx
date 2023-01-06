/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';
// @ts-ignore
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhY29mcmVoIiwiYSI6ImNsNDZzZ3ptZzBiaGgza213ZnloeDBnZTkifQ.9_P-Ueky-lN4GJB8Ib55qg';


if(!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error("Geolocation is not supported by your browser");
  
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

