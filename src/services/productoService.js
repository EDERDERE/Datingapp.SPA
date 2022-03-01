import http from './httpService';

const apiEndpoint = '/Producto';

export function getProductos() {
  return http.get(apiEndpoint);
}

export default {
  getProductos
};
