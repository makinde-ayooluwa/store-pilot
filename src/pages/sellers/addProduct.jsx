import React, { useState } from "react"
import {
    MdArrowBack,
    MdCloudUpload,
    MdDelete,
    MdAdd,
    MdClose
} from "react-icons/md"
import { Link } from "react-router-dom"

export default function SellerAddProduct() {

    const [images, setImages] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        description: "",
        price: "",
        comparePrice: "",
        stock: "",
        lowStockThreshold: "",
        status: "Active"
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }))

        setImages((prev) => [...prev, ...newImages])
    }

    const removeImage = (index) => {
        setImages((prev) => {
            const updated = [...prev]

            URL.revokeObjectURL(updated[index].preview)

            updated.splice(index, 1)

            return updated
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log({
            ...formData,
            images
        })

        // API submission will be added later
    }

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-70px)] p-4 sm:p-6 lg:p-8">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div className="flex items-center gap-3">

                    <Link
                        to="/seller/products"
                        className="
                            p-2
                            rounded-xl
                            bg-white
                            border border-gray-200
                            hover:bg-gray-100
                            transition
                        "
                    >
                        <MdArrowBack size={21} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Add Product
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Add a new product to your store.
                        </p>
                    </div>

                </div>

            </div>


            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">


                    {/* LEFT SIDE */}
                    <div className="space-y-6">

                        {/* BASIC INFORMATION */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Basic Information
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 mb-6">
                                Provide the basic details of your product.
                            </p>


                            {/* PRODUCT NAME */}
                            <div className="mb-5">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Nike Air Max 270"
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border border-gray-200
                                        outline-none
                                        text-sm
                                        focus:border-green-600
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                />

                            </div>


                            {/* SKU + CATEGORY */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        SKU
                                    </label>

                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        placeholder="e.g. NIK-001"
                                        className="
                                            w-full
                                            px-4
                                            py-3
                                            rounded-xl
                                            border border-gray-200
                                            outline-none
                                            text-sm
                                            focus:border-green-600
                                            focus:ring-2
                                            focus:ring-green-100
                                        "
                                    />

                                </div>


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full
                                            px-4
                                            py-3
                                            rounded-xl
                                            border border-gray-200
                                            outline-none
                                            text-sm
                                            bg-white
                                            focus:border-green-600
                                        "
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        <option value="Fashion">
                                            Fashion
                                        </option>

                                        <option value="Electronics">
                                            Electronics
                                        </option>

                                        <option value="Shoes">
                                            Shoes
                                        </option>

                                        <option value="Bags">
                                            Bags
                                        </option>

                                        <option value="Beauty">
                                            Beauty
                                        </option>

                                        <option value="Home">
                                            Home
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* DESCRIPTION */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Describe your product..."
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border border-gray-200
                                        outline-none
                                        text-sm
                                        resize-none
                                        focus:border-green-600
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                />

                            </div>

                        </div>


                        {/* PRICING */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Pricing
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 mb-6">
                                Set the selling price for your product.
                            </p>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selling Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            ₦
                                        </span>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            required
                                            className="
                                                w-full
                                                pl-9
                                                pr-4
                                                py-3
                                                rounded-xl
                                                border border-gray-200
                                                outline-none
                                                text-sm
                                                focus:border-green-600
                                            "
                                        />

                                    </div>

                                </div>


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Compare-at Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            ₦
                                        </span>

                                        <input
                                            type="number"
                                            name="comparePrice"
                                            value={formData.comparePrice}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="
                                                w-full
                                                pl-9
                                                pr-4
                                                py-3
                                                rounded-xl
                                                border border-gray-200
                                                outline-none
                                                text-sm
                                                focus:border-green-600
                                            "
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* INVENTORY */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Inventory
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 mb-6">
                                Manage your product stock.
                            </p>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stock Quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        required
                                        className="
                                            w-full
                                            px-4
                                            py-3
                                            rounded-xl
                                            border border-gray-200
                                            outline-none
                                            text-sm
                                            focus:border-green-600
                                        "
                                    />

                                </div>


                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Low Stock Alert
                                    </label>

                                    <input
                                        type="number"
                                        name="lowStockThreshold"
                                        value={formData.lowStockThreshold}
                                        onChange={handleChange}
                                        placeholder="e.g. 5"
                                        className="
                                            w-full
                                            px-4
                                            py-3
                                            rounded-xl
                                            border border-gray-200
                                            outline-none
                                            text-sm
                                            focus:border-green-600
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* PRODUCT IMAGES */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Product Images
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 mb-5">
                                Upload images of your product.
                            </p>


                            {/* UPLOAD */}
                            <label
                                htmlFor="product-images"
                                className="
                                    flex flex-col
                                    items-center
                                    justify-center
                                    min-h-[180px]
                                    border-2
                                    border-dashed
                                    border-gray-200
                                    rounded-2xl
                                    cursor-pointer
                                    hover:border-green-500
                                    hover:bg-green-50/30
                                    transition
                                "
                            >

                                <MdCloudUpload
                                    size={40}
                                    className="text-green-600"
                                />

                                <p className="text-sm font-medium text-gray-700 mt-3">
                                    Click to upload images
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    PNG, JPG or WEBP
                                </p>

                                <input
                                    id="product-images"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                            </label>


                            {/* IMAGE PREVIEWS */}
                            {images.length > 0 && (

                                <div className="grid grid-cols-2 gap-3 mt-4">

                                    {images.map((image, index) => (

                                        <div
                                            key={index}
                                            className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
                                        >

                                            <img
                                                src={image.preview}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="
                                                    absolute
                                                    top-2
                                                    right-2
                                                    p-1.5
                                                    rounded-lg
                                                    bg-white
                                                    text-red-500
                                                    shadow
                                                    hover:bg-red-50
                                                "
                                            >
                                                <MdClose size={18} />
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>


                        {/* STATUS */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Product Status
                            </h2>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border border-gray-200
                                    bg-white
                                    outline-none
                                    text-sm
                                    focus:border-green-600
                                "
                            >
                                <option value="Active">
                                    Active
                                </option>

                                <option value="Draft">
                                    Draft
                                </option>
                            </select>

                        </div>


                        {/* ACTIONS */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                            <button
                                type="submit"
                                className="
                                    w-full
                                    flex items-center justify-center gap-2
                                    px-4
                                    py-3
                                    rounded-xl
                                    bg-green-700
                                    hover:bg-green-800
                                    text-white
                                    text-sm
                                    font-medium
                                    transition
                                "
                            >
                                <MdAdd size={20} />
                                Add Product
                            </button>


                            <Link
                                to="/seller/products"
                                className="
                                    w-full
                                    flex items-center justify-center
                                    px-4
                                    py-3
                                    rounded-xl
                                    mt-3
                                    border border-gray-200
                                    text-gray-700
                                    text-sm
                                    font-medium
                                    hover:bg-gray-50
                                    transition
                                "
                            >
                                Cancel
                            </Link>

                        </div>

                    </div>

                </div>

            </form>

        </div>
    )
}