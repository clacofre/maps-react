import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 5,
        languague: 'es',
        access_token: 'pk.eyJ1IjoiY2xhY29mcmVoIiwiYSI6ImNsNDZzZ3ptZzBiaGgza213ZnloeDBnZTkifQ.9_P-Ueky-lN4GJB8Ib55qg'
    }
})

export default searchApi