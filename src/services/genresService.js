import http from './httpService';
// import axios from 'axios';
//import { apiUrl } from '../config.json';

export function getGenres() {
  //  return axios.get('http://localhost:3900/api/genres');
  return http.get('/genres'); //('http://localhost:3900/api/genres')
}
