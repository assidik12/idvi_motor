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

  // ===== Dynamic Specs Logic =====
  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpecField = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpecField = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  // ===============================

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setToaster({ message: "Image size must be less than 10MB", varian: "Warning" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
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
          if (spec.key && spec.value) acc[spec.key] = spec.value;
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
          }
          setIsLoading(false);
        });
      } else {
        setToaster({ message: "Failed to add product data.", varian: "Warning" });
        setIsLoading(false);
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
      <div
        className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out 
                      w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 shrink-0">
          <h3 id="modal-title" className="text-2xl font-semibold text-gray-900">
            Add Product
          </h3>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleAddProduct} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          {/* Product Detail */}
          <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3">
            <Input label="Product Name" name="name" type="text" placeholder="e.g., Honda HRV" />
            <Input label="Model" name="model" type="text" placeholder="e.g., crossover" />
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

          {/* Quantity */}
          <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3">
            <Input label="Price" name="price" type="number" placeholder="e.g., 250000000" />
            <Input label="Make" name="make" type="text" placeholder="e.g., Honda" />
            <Input label="Type" name="type" type="text" placeholder="e.g., SUV" />
          </div>

          {/* Year & Status */}
          <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3">
            <Input label="Year" name="year" type="number" placeholder="e.g., 2025" />
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
              placeholder="Describe the product details..."
            ></textarea>
          </div>

          {/* Specifications */}
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

          {/* Image Upload */}
          <div>
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
        </form>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end items-center shrink-0">
          <div className="flex space-x-3">
            <Button type="button" onClick={() => setModalAddProduct(false)} disabled={isLoading} varian="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} varian="primary">
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddProduct;
