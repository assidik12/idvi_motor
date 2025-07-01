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
      // Validasi ukuran gambar
      if (file.size > 10 * 1024 * 1024) {
        // 10 MB
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
      // 1. Ambil file dari form dan validasi ukuran
      const file = form.image.files?.[0];
      if (file && file.size > 10 * 1024 * 1024) {
        // 10MB
        setToaster({ message: "Ukuran gambar harus kurang dari 10MB", varian: "Warning" });
        return;
      }

      // 2. Tentukan URL gambar, dahulukan upload gambar baru jika ada
      let imageUrl = productData.image; // Default menggunakan gambar lama

      if (file) {
        // Mengubah fungsi callback-based menjadi Promise-based agar bisa ditunggu (await)
        // Ini adalah cara modern dan aman untuk menangani operasi asinkron
        imageUrl = await new Promise<string>((resolve, reject) => {
          uploadFile(productData.id, "products", file, (newImageUrl: string) => {
            if (newImageUrl) {
              resolve(newImageUrl);
            } else {
              reject(new Error("Gagal mengunggah gambar."));
            }
          });
        });
      }

      // 3. Siapkan data yang akan dikirim ke server
      // Data ini baru dibuat SETELAH imageUrl dijamin sudah terisi URL yang benar
      const dataToUpdate = {
        name: form.name.value ? form.name.value : productData.name,
        description: form.description.value ? form.description.value : productData.description,
        price: form.price.value ? parseInt(form.price.value) : productData.price,
        quantity: form.quantity.value ? parseInt(form.quantity.value) : productData.quantity,
        totalStock: form.totalStock.value ? parseInt(form.totalStock.value) : productData.totalStock,
        category: form.category.value ? form.category.value : productData.category,
        image: imageUrl,
      };

      // 4. Kirim data untuk diupdate
      const res = await ProductServices.updateProduct(productData.id, dataToUpdate, session.data?.accessToken);

      // 5. Tangani respons dari server
      if (res.data.status) {
        const { data } = await ProductServices.getAllProducts();
        setProductData(data.data);
        setIsLoading(false);
        setToaster({ message: "Product updated successfully.", varian: "Succes" });
        setModalUpdateProduct({}); // Tutup modal setelah sukses
      } else {
        // Jika status dari API false, lemparkan error agar ditangkap oleh blok catch
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      // Tangani semua kemungkinan error (network, upload, update) di satu tempat
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
      <div className="px-6 pt-6 pb-4 border-b border-gray-200">
        <div className="flex items-start">
          <div className="flex-grow">
            <h3 id="modal-title" className="text-2xl font-semibold text-gray-900">
              Update Product
            </h3>
          </div>
        </div>
      </div>
      <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
        {/* product detail */}
        <div className="flex space-x-3">
          <Input label="Product Name" name="name" type="text" placeholder={productData.name} />
          <Input label="Category" name="category" type="text" placeholder={productData.category} />
        </div>

        {/* quanty */}
        <div className="flex">
          <Input label="Quantity" name="quantity" type="number" placeholder={productData.quantity} />
          <Input label="Price" name="price" type="number" placeholder={productData.price} />
          <Input label="Total Stock" name="totalStock" type="number" placeholder={productData.totalStock} />
        </div>

        {/* */}
        <div className="flex flex-col">
          <div className="flex items-center">
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
          <div>
            <div className="sm:col-span-2">
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
          </div>
        </div>

        {/* change image */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
          <div className="md:col-span-1 space-y-1">
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

        {/* button */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
          <div className="flex space-x-3">
            <Button
              type="button"
              onClick={() => setModalUpdateProduct(false)}
              disabled={isLoading}
              varian="secondary"
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              varian="primary"
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              {isLoading ? "Loading..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
