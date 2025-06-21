import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import ProductServices from "@/services/products";
import { useState } from "react";

const ModalDeleteProduct = (props: any) => {
  const { setModalDeleteProduct, productData, setToaster, setProductData, session } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      const res: any = await ProductServices.deleteProduct(productData.id, session.data?.accessToken);
      if (res.status) {
        const { data } = await ProductServices.getAllProducts();
        setProductData(data.data);
        setToaster({ message: "Delete product success", varian: "Succes" });
        setIsLoading(false);
        setModalDeleteProduct({});
      }
    } catch (error) {
      setToaster({ message: "Delete product failed", varian: "Error" });
      setIsLoading(false);
      setModalDeleteProduct({});
    }
  };
  return (
    <Modal onClose={() => setModalDeleteProduct({})}>
      <div className="p-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Delete Product</h1>
          <h3 className="text-lg font-semibold mt-2">Are you sure to delete{<span className="font-bold text-red-500"> {productData.name}</span>}?</h3>
        </div>
        <div className="flex justify-center gap-2 py-3">
          <Button onClick={() => setModalDeleteProduct({})} varian="primary" disabled={isLoading} type="button">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} varian="danger" disabled={isLoading} type="submit">
            {isLoading ? "loading..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;
