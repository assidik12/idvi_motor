import Input from "@/components/ui/input";
import Image from "next/image";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";
import { UploadCloud } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import ProductServices from "@/services/products";
import { uploadFile } from "@/lib/firebase/service";
import Button from "@/components/ui/button";

const ModalUpdateProduct = (props: any) => {
  const { setModalUpdateProduct, productData, setProductData, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setToaster({ message: "Image size must be less than 10MB", varian: "Warning" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    setIsLoading(true);

    try {
      const file = form.image.files?.[0];
      if (file && file.size > 10 * 1024 * 1024) {
        setToaster({ message: "Ukuran gambar harus kurang dari 10MB", varian: "Warning" });
        return;
      }

      let imageUrl = productData.image;
      if (file) {
        imageUrl = await new Promise<string>((resolve, reject) => {
          uploadFile(productData.id, "products", file, (newImageUrl: string) => {
            if (newImageUrl) resolve(newImageUrl);
            else reject(new Error("Gagal mengunggah gambar."));
          });
        });
      }

      const dataToUpdate = {
        name: form.name.value ? form.name.value : productData.name,
        description: form.description.value ? form.description.value : productData.description,
        price: form.price.value ? parseInt(form.price.value) : productData.price,
        quantity: form.quantity.value ? parseInt(form.quantity.value) : productData.quantity,
        totalStock: form.totalStock.value ? parseInt(form.totalStock.value) : productData.totalStock,
        category: form.category.value ? form.category.value : productData.category,
        image: imageUrl,
      };

      const res = await ProductServices.updateProduct(productData.id, dataToUpdate, session.data?.accessToken);

      if (res.data.status) {
        const { data } = await ProductServices.getAllProducts();
        setProductData(data.data);
        setIsLoading(false);
        setToaster({ message: "Product updated successfully.", varian: "Success" });
        setModalUpdateProduct({});
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      setModalUpdateProduct({});
      setToaster({
        message: error.message || "Terjadi kesalahan yang tidak terduga.",
        varian: "Error",
      });
    }
  };

  return (
    <Modal onClose={() => setModalUpdateProduct({})}>
      <div
        className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out 
                      w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 shrink-0">
          <h3 id="modal-title" className="text-2xl font-semibold text-gray-900">
            Update Product
          </h3>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleUpdateProduct} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          {/* Product detail */}
          <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3">
            <Input label="Product Name" name="name" type="text" placeholder={productData.name} />
            <Input label="Category" name="category" type="text" placeholder={productData.category} />
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3">
            <Input label="Quantity" name="quantity" type="number" placeholder={productData.quantity} />
            <Input label="Price" name="price" type="number" placeholder={productData.price} />
            <Input label="Total Stock" name="totalStock" type="number" placeholder={productData.totalStock} />
          </div>

          {/* SKU & Status */}
          <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3">
            <Input label="SKU (Optional)" name="sku" type="text" placeholder={productData.sku} />
            <Select
              label="Status"
              name="status"
              options={[
                { value: "Active", label: "Active" },
                { value: "Draft", label: "Draft" },
              ]}
              defaultValue={productData.status}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block w-full px-4 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder={productData.description}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Product Image</label>
              <div
                className="relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" layout="fill" className="object-cover rounded-lg" />
                ) : (
                  <div className="text-gray-500">
                    <UploadCloud size={40} className="mx-auto mb-2" />
                    <p className="font-semibold">Click to upload</p>
                    <p className="text-xs mt-1">PNG, JPG, WEBP (Max 10MB)</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} name="image" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end items-center shrink-0">
          <div className="flex space-x-3">
            <Button type="button" onClick={() => setModalUpdateProduct(false)} disabled={isLoading} varian="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} varian="primary">
              {isLoading ? "Loading..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdateProduct;
