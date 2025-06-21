import ProductsAdminView from "@/components/views/admin/Product";
import ProductServices from "@/services/products";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProductsAdminPage = ({ setToaster }: any) => {
  const [products, setProducts] = useState([]);
  const session: any = useSession();

  useEffect(() => {
    const getAllProduct = async () => {
      const { data } = await ProductServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProduct();
  }, []);

  return (
    <>
      <ProductsAdminView setToaster={setToaster} products={products} session={session} />
    </>
  );
};

export default ProductsAdminPage;
