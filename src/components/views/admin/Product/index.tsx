import AdminLayout from "@/components/layouts/AdminLayout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import formatCurrency from "@/utils/currency";
import { TypeCar } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { PlusCircle, Edit3, Trash2, Package } from "lucide-react";
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

  // Komponen untuk tombol aksi agar tidak duplikasi kode
  const ActionButtons = ({ product }: { product: TypeCar }) => (
    <div className="flex items-center justify-center gap-2">
      <Button varian="ghost" className="p-2" aria-label="Update" onClick={() => setModalUpdateProduct(product)}>
        <Edit3 size={16} />
      </Button>
      <Button varian="ghost" className="text-red-600 hover:bg-red-50 p-2" aria-label="Delete" onClick={() => setModalDeleteProduct(product)}>
        <Trash2 size={16} />
      </Button>
    </div>
  );

  const NoProductsView = () => (
    <div className="text-center py-12 text-gray-500 col-span-full">
      <Package size={32} className="mx-auto mb-2 text-gray-400" />
      No products found.
    </div>
  );

  return (
    <>
      <AdminLayout>
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Product Management</h1>
            <Button varian="primary" onClick={() => setModalAddProduct({ open: true })}>
              <PlusCircle size={18} />
              Add Product
            </Button>
          </div>

          {/* Tampilan Kartu untuk Mobile (hidden di md ke atas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {productData && productData.length > 0 ? (
              productData.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
                  <div className="relative h-40 w-full">
                    <Image src={product.image} alt={product.name} layout="fill" className="object-cover rounded-t-lg" />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.model}</p>
                    <div className="mt-2 text-sm text-gray-700 flex-grow">
                      <p>
                        <span className="font-semibold">Tahun:</span> {product.year}
                      </p>
                      <p>
                        <span className="font-semibold">Kondisi:</span> {product.condition}
                      </p>
                    </div>
                    <p className="mt-2 text-lg font-bold text-blue-600">{formatCurrency(product.price)}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <ActionButtons product={product} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoProductsView />
            )}
          </div>

          {/* Tampilan Tabel untuk Desktop (hidden di bawah md) */}
          <div className="hidden md:block bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 font-medium uppercase">
                  <tr>
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
                          <ActionButtons product={product} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">
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
