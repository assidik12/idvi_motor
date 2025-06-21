import React, { FormEvent, useState, useRef } from "react";
import Image from "next/image";
import ProductServices from "@/services/products";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { uploadFile } from "@/lib/firebase/service";
import { PlusCircle, UploadCloud, XCircle } from "lucide-react";
import { TypeCar } from "@/types/product.type";
import Select from "@/components/ui/Select";

const ModalAddProduct = (props: any) => {
  const { setModalAddProduct, setProductData, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SpecInput = ({ spec, index, handleSpecChange, removeSpecField }: any) => (
    <div className="flex items-center space-x-2 mb-2">
      <Input label="" name={`spec-key-${index}`} type="text" placeholder="e.g., Color" value={spec.key} onChange={(e) => handleSpecChange(index, "key", e.target.value)} className="w-1/3" />
      <Input label="" name={`spec-value-${index}`} type="text" placeholder="e.g., Red" value={spec.value} onChange={(e) => handleSpecChange(index, "value", e.target.value)} className="w-2/3" />
      <button type="button" onClick={() => removeSpecField(index)} className="text-red-500 hover:text-red-700 transition-colors">
        <XCircle size={20} />
      </button>
    </div>
  );
  // ========== Logic untuk Spesifikasi Dinamis ==========
  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpecField = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpecField = (index: number) => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs);
  };
  // =====================================================

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

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form: any = e.target as HTMLFormElement;
    const file = form.image.files?.[0];

    if (!file) {
      setToaster({ message: "Product image is required.", varian: "Warning" });
      setIsLoading(false);
      return;
    }
    try {
      const productPayload: TypeCar = {
        name: form.name.value,
        model: form.model.value,
        condition: form.condition?.value,
        type: form.type?.value,
        price: parseInt(form.price.value),
        make: form.make.value,
        specs: specs.reduce((acc, spec) => {
          if (spec.key && spec.value) {
            acc[spec.key] = spec.value;
          }
          return acc;
        }, {} as Record<string, string>),
        year: parseInt(form.year.value),
        status: "Active",
        description: form.description?.value,
        image: "",
        updated_at: new Date(),
        created_at: new Date(),
      };
      const res: any = await ProductServices.addProduct(productPayload, session.data?.accessToken);
      if (res.data.status && res.data.id) {
        await uploadFile(res.data.id, "products", file, async (newImageUrl: string) => {
          const updatePayload = { image: newImageUrl };
          const updateRes = await ProductServices.updateProduct(res.data.id, updatePayload, session.data?.accessToken);

          if (updateRes.status) {
            const { data } = await ProductServices.getAllProducts();
            setProductData(data.data);
            setModalAddProduct(false);
            setToaster({ message: "Product added successfully", varian: "Succes" });
          } else {
            setToaster({ message: "Failed to update product image.", varian: "Warning" });
            setIsLoading(false);
            setModalAddProduct(false);
          }
        });
      } else {
        setToaster({ message: "Failed to add product data.", varian: "Warning" });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setToaster({ message: `Error: ${errorMessage}`, varian: "Error" });
      setModalAddProduct(false);
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      {/* */}
      <div className="object-cover bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100 opacity-100">
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-start">
            <div className="flex-grow">
              <h3 id="modal-title" className="text-2xl font-semibold text-gray-900">
                Add Product
              </h3>
            </div>
          </div>
        </div>
        <form onSubmit={handleAddProduct} className="p-6 space-y-4">
          {/* product detail */}
          <div className="flex space-x-3">
            <Input label="Product Name" name="name" type="text" placeholder="e.g., Organic Body Butter" />
            <Input label="Model" name="model" type="text" placeholder="e.g., Skin Care" />
            <Select
              label="Condition"
              name="condition"
              options={[
                { value: "New", label: "New" },
                { value: "Used", label: "Used" },
              ]}
              defaultValue="New"
            />
          </div>

          {/* quanty */}
          <div className="flex">
            <Input label="Price" name="price" type="number" placeholder="e.g., 150000" />
            <Input label="Make" name="make" type="text" placeholder="e.g., Body Butter" />
            <Input label="Type" name="type" type="text" placeholder="e.g., Body Butter" />
          </div>

          {/* */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <Input label="Year" name="year" type="date" placeholder="e.g., 2023" />
              <Select
                label="Status"
                name="status"
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Draft", label: "Draft" },
                ]}
                defaultValue="Active"
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
                  placeholder="Describe the product details..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Specifications</label>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              {specs.map((spec, index) => (
                <SpecInput key={index} spec={spec} index={index} handleSpecChange={handleSpecChange} removeSpecField={removeSpecField} />
              ))}
              <Button type="button" onClick={addSpecField} varian="outline" className="mt-2">
                <PlusCircle size={16} className="mr-2" />
                Add Specification
              </Button>
            </div>
          </div>

          {/* change image */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
            <div className="md:col-span-1 space-y-0">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Product Image</label>
              <div
                className="relative w-full max-w-md aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" layout="fill" className="object-cover rounded-lg" />
                ) : (
                  <div className="text-gray-500">
                    <UploadCloud size={30} className="mx-auto mb-2" />
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
                onClick={() => setModalAddProduct(false)}
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
                {isLoading ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalAddProduct;
