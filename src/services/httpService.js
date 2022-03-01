import axios from 'axios';

const httpService = axios.create({
  baseURL: 'https://localhost:44302/api'
});

export default httpService;
