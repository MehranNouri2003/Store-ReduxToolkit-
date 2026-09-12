import api from "../lib/axios"
export const ProductsService = {
    
  create: (data) => api.post("/products", data).then((res) => res.data),

  getAll: () => api.get("/products").then((res) => res.data),
  getOne: (id) => api.get(`/products/${id}`).then((res) => res.data),

  update: (id, data) =>
    api.patch(`/products/${id}`, data).then((res) => res.data),

  delete: (id) => api.delete(`/products/${id}`).then((res) => res.data),
};
