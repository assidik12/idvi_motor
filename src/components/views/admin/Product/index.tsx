import AdminLayout from "@/components/layouts/AdminLayout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import formatCurrency from "@/utils/currency";
import { TypeCar } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { PlusCircle, Edit3, Trash2, ImageOff, Package } from "lucide-react";
import ModalDeleteProduct from "./ModulDeleteProduct";

type propsType = {
  setToaster: Dispatch<SetStateAction<{}>>;
  products: TypeCar[];
  session: any;
};

const ProductsAdminView = (props: propsType) => {
  const { products, setToaster, session } = props;
  const [modalAddProduct, setModalAddProduct] = useState({});
  const [modalUpdateProduct, setModalUpdateProduct] = useState({});
  const [modalDeleteProduct, setModalDeleteProduct] = useState({});
  const [productData, setProductData] = useState<TypeCar[]>([]);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className="p-6 md:p-8 font-sans">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Product Management</h1>
            <Button varian="primary" onClick={() => setModalAddProduct({ open: true })}>
              <PlusCircle size={18} />
              Add Product
            </Button>
          </div>
          {/* Tabel Produk */}
          <div className="bg-white border border-gray-200/75 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 font-medium uppercase">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Product</th>
                    <th className="px-6 py-4 text-left">Model</th>
                    <th className="px-6 py-4 text-left">Tahun</th>
                    <th className="px-6 py-4 text-left">Condition</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/75">
                  {productData && productData.length > 0 ? (
                    productData.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/75 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-500" title={product.id}>
                            {product.id?.toString().substring(0, 12)}...
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Image src={product.image} alt={product.name} width={48} height={48} className="h-full w-full object-cover rounded-lg" />
                            </div>
                            <span className="font-semibold text-gray-800">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.condition}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-700">{formatCurrency(product.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button varian="ghost" className="p-2" aria-label="Update" onClick={() => setModalUpdateProduct(product)}>
                              <Edit3 size={16} />
                            </Button>
                            <Button varian="ghost" className="text-red-600 hover:bg-red-50" aria-label="Delete" onClick={() => setModalDeleteProduct(product)}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-500">
                        <Package size={32} className="mx-auto mb-2 text-gray-400" />
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
      {Object.keys(modalAddProduct).length !== 0 && <ModalAddProduct setModalAddProduct={setModalAddProduct} setProductData={setProductData} setToaster={setToaster} session={session} />}
      {Object.keys(modalUpdateProduct).length !== 0 && <ModalUpdateProduct setModalUpdateProduct={setModalUpdateProduct} productData={modalUpdateProduct} setProductData={setProductData} setToaster={setToaster} session={session} />}
      {Object.keys(modalDeleteProduct).length !== 0 && <ModalDeleteProduct setModalDeleteProduct={setModalDeleteProduct} productData={modalDeleteProduct} setProductData={setProductData} setToaster={setToaster} session={session} />}
    </>
  );
};

export default ProductsAdminView;
