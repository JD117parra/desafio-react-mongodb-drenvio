import axios from "axios";

import { Producto, PrecioEspecial } from "../types";
import { get } from "http";

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const productosAPI = {
    getAll: () => api.get<Producto[]>("/productos"),
};

export const preciosEspecialesAPI = {
    getAll: () => api.get<PrecioEspecial[]>("/precios-especiales"),
    create: (data: Omit<PrecioEspecial, '_id'>) => api.post<{success: boolean}>('/precios-especiales', data),
    verificarUsuario: (userId: string) => api.get<{ hasSpecialPrice: boolean, data: PrecioEspecial | null}>(`/precios-especiales/verificar/${userId}`), 
};

export default api;