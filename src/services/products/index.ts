import instance from "@/lib/axios/instace";

const ProductServices = {
  getAllProducts: () => instance.get("/api/products/query"),
  addProduct: (data: any, token: string) =>
    instance.post("/api/products/query", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteProduct: (id: string, token: string) =>
    instance.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(`/api/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default ProductServices;
