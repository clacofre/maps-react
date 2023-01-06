import axios from 'axios';

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiY2xhY29mcmVoIiwiYSI6ImNsNDZzZ3ptZzBiaGgza213ZnloeDBnZTkifQ.9_P-Ueky-lN4GJB8Ib55qg'
    }
})

export default directionsApi