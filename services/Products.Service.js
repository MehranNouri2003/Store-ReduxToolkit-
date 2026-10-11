// import api from "../lib/axios"
// export const ProductsService = {
    
//   create: (data) => api.post("/products", data).then((res) => res.data),

//   getAll: () => api.get("/products").then((res) => res.data),
//   getOne: (id) => api.get(`/products/${id}`).then((res) => res.data),

//   update: (id, data) =>
//     api.patch(`/products/${id}`, data).then((res) => res.data),

//   delete: (id) => api.delete(`/products/${id}`).then((res) => res.data),
// };


import products from "../lib/products.json";

export const ProductsService = {
  getAll: async () => products,

  getOne: async (id) => {
    const product = products.find(
      (item) => item.id === Number(id),
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },
};
