import axios from "axios";


const API_URL = import.meta.env.VITE_PUBLIC_API_URL || '';
const GEO_API_URL = import.meta.env.VITE_PUBLIC_API_GEO_URL || '';


const api = axios.create({baseURL: API_URL});

const geoApi = axios.create({baseURL: GEO_API_URL});

export {api, geoApi}
