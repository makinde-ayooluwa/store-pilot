import React, { useEffect, useState } from 'react'

import {
    MdArrowBack,
    MdCloudUpload,
    MdDelete,
    MdImage,
    MdSave,
    MdInventory
} from 'react-icons/md'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSeller } from '../../contexts/sellerProvider'

export default function EditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { products = [] } = useSeller()

    const product = products.find(
        (item) => String(item.id) === String(id)
    )

    const [formData, setFormData] = useState(null)
    const [previewImages, setPreviewImages] = useState([])
    const [saving, setSaving] = useState(false)

    /*
     * Load the selected product
     */
    useEffect(() => {
        if (!product) return

        const productData = {
            ...product,

            name: product.name ?? '',
            description: product.description ?? '',
            category: product.category ?? '',
            price: product.price ?? '',
            oldPrice: product.oldPrice ?? '',
            stock: product.stock ?? '',
            sku: product.sku ?? '',
            status: product.status ?? 'Active'
        }

        setFormData(productData)

        /*
         * Support both:
         *
         * images: []
         *
         * or
         *
         * image: ''
         */
        if (Array.isArray(product.images)) {
            setPreviewImages(product.images)
        } else if (product.image) {
            setPreviewImages([product.image])
        } else {
            setPreviewImages([])
        }
    }, [product])

    /*
     * Handle normal inputs
     */
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((current) => ({
            ...current,
            [name]: value
        }))
    }

    /*
     * Upload new images
     */
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || [])

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }))

        setPreviewImages((current) => [
            ...current,
            ...newImages
        ])

        e.target.value = ''
    }

    /*
     * Remove image
     */
    const removeImage = (index) => {
        setPreviewImages((current) =>
            current.filter(
                (_, imageIndex) => imageIndex !== index
            )
        )
    }

    /*
     * Submit
     *
     * Actual update logic can be connected to your sellerProvider
     * when you are ready.
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        setSaving(true)

        /*
         * Example when your provider has an update function:
         *
         * updateProduct(id, {
         *     ...formData,
         *     images: previewImages
         * })
         */

        setTimeout(() => {
            setSaving(false)
            navigate('/seller/products')
        }, 800)
    }

    /*
     * Products are still loading
     */
    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-sm text-gray-500">
                        Loading product...
                    </p>
                </div>
            </div>
        )
    }

    /*
     * Product doesn't exist
     */
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-xl py-20 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <MdInventory
                            size={30}
                            className="text-gray-400"
                        />
                    </div>

                    <h1 className="mt-5 text-xl font-semibold text-gray-900">
                        Product not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        The product you're trying to edit could not be found.
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                        Product ID: {id}
                    </p>

                    <Link
                        to="/seller/products"
                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-green-700
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-green-800
                        "
                    >
                        <MdArrowBack size={18} />
                        Back to Products
                    </Link>

                </div>
            </div>
        )
    }

    /*
     * Prevent form from rendering before formData is ready
     */
    if (!formData) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-sm text-gray-500">
                        Loading product...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">

            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <Link
                        to="/seller/products"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            text-gray-600
                            transition
                            hover:bg-gray-100
                        "
                    >
                        <MdArrowBack size={21} />
                    </Link>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                            Edit Product
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Update your product information
                        </p>
                    </div>

                </div>

                <button
                    type="submit"
                    form="edit-product-form"
                    disabled={saving}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-green-600
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-green-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    <MdSave size={19} />

                    {saving
                        ? 'Saving...'
                        : 'Save Changes'}
                </button>

            </div>

            <form
                id="edit-product-form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 xl:grid-cols-3"
            >

                {/* =========================================
                    MAIN CONTENT
                ========================================== */}

                <div className="space-y-6 xl:col-span-2">

                    {/* PRODUCT INFORMATION */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">

                        <div className="mb-5">
                            <h2 className="text-base font-bold text-gray-900">
                                Product Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Basic information about your product
                            </p>
                        </div>

                        <div className="space-y-5">

                            {/* PRODUCT NAME */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-green-500
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                    required
                                />

                            </div>

                            {/* DESCRIPTION */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Describe your product..."
                                    className="
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-green-500
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                    required
                                />

                            </div>

                            {/* CATEGORY */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-green-500
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                    required
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Electronics">
                                        Electronics
                                    </option>

                                    <option value="Fashion">
                                        Fashion
                                    </option>

                                    <option value="Home & Living">
                                        Home & Living
                                    </option>

                                    <option value="Groceries">
                                        Groceries
                                    </option>

                                    <option value="Beauty">
                                        Beauty
                                    </option>

                                    <option value="Sports">
                                        Sports
                                    </option>

                                    <option value="Computers">
                                        Computers
                                    </option>

                                    <option value="Phones & Tablets">
                                        Phones & Tablets
                                    </option>

                                    <option value="Automotive">
                                        Automotive
                                    </option>

                                    <option value="Kids">
                                        Kids
                                    </option>

                                    <option value="Books">
                                        Books
                                    </option>

                                    <option value="Others">
                                        Others
                                    </option>
                                </select>

                            </div>

                        </div>
                    </div>


                    {/* PRICING & INVENTORY */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">

                        <div className="mb-5">

                            <h2 className="text-base font-bold text-gray-900">
                                Pricing & Inventory
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage product pricing and stock
                            </p>

                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* SELLING PRICE */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Selling Price
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ₦
                                    </span>

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-200
                                            py-3
                                            pl-9
                                            pr-4
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-green-500
                                            focus:ring-2
                                            focus:ring-green-100
                                        "
                                        required
                                    />

                                </div>

                            </div>


                            {/* PREVIOUS PRICE */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Previous Price
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                        ₦
                                    </span>

                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleChange}
                                        min="0"
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-200
                                            py-3
                                            pl-9
                                            pr-4
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-green-500
                                            focus:ring-2
                                            focus:ring-green-100
                                        "
                                    />

                                </div>

                            </div>


                            {/* STOCK */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Stock Quantity
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-green-500
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                    required
                                />

                            </div>


                            {/* SKU */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    SKU
                                </label>

                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="Product SKU"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-green-500
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* IMAGES */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">

                        <div className="mb-5">

                            <h2 className="text-base font-bold text-gray-900">
                                Product Images
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Update the images displayed for this product
                            </p>

                        </div>


                        {/* UPLOAD */}
                        <label className="
                            flex
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border-2
                            border-dashed
                            border-gray-200
                            px-6
                            py-10
                            transition
                            hover:border-green-400
                            hover:bg-green-50/30
                        ">

                            <div className="
                                mb-3
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-green-50
                                text-green-600
                            ">
                                <MdCloudUpload size={26} />
                            </div>

                            <p className="text-sm font-semibold text-gray-700">
                                Upload product images
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                PNG, JPG or WEBP
                            </p>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                        </label>


                        {/* IMAGE PREVIEWS */}
                        {previewImages.length > 0 && (

                            <div className="
                                mt-5
                                grid
                                grid-cols-2
                                gap-4
                                sm:grid-cols-3
                                md:grid-cols-4
                            ">

                                {previewImages.map((image, index) => {

                                    const imageUrl =
                                        typeof image === 'string'
                                            ? image
                                            : image.preview

                                    return (

                                        <div
                                            key={index}
                                            className="
                                                group
                                                relative
                                                aspect-square
                                                overflow-hidden
                                                rounded-lg
                                                border
                                                border-gray-200
                                            "
                                        >

                                            <img
                                                src={imageUrl}
                                                alt={`Product ${index + 1}`}
                                                className="
                                                    h-full
                                                    w-full
                                                    object-cover
                                                "
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="
                                                    absolute
                                                    right-2
                                                    top-2
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-white/90
                                                    text-red-500
                                                    opacity-0
                                                    shadow
                                                    transition
                                                    group-hover:opacity-100
                                                "
                                            >
                                                <MdDelete size={18} />
                                            </button>

                                        </div>

                                    )
                                })}

                            </div>

                        )}

                    </div>

                </div>


                {/* =========================================
                    RIGHT SIDEBAR
                ========================================== */}

                <div className="space-y-6">

                    {/* STATUS */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">

                        <h2 className="mb-5 text-base font-bold text-gray-900">
                            Product Status
                        </h2>

                        <div className="space-y-3">

                            {[
                                'Active',
                                'Draft',
                                'Inactive'
                            ].map((status) => (

                                <label
                                    key={status}
                                    className={`
                                        flex
                                        cursor-pointer
                                        items-center
                                        gap-3
                                        rounded-lg
                                        border
                                        p-3
                                        transition
                                        ${
                                            formData.status === status
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200'
                                        }
                                    `}
                                >

                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={
                                            formData.status === status
                                        }
                                        onChange={handleChange}
                                        className="accent-green-600"
                                    />

                                    <div>

                                        <p className="text-sm font-medium text-gray-800">
                                            {status}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {status === 'Active'
                                                ? 'Visible to customers'
                                                : status === 'Draft'
                                                ? 'Not visible to customers'
                                                : 'Temporarily unavailable'}
                                        </p>

                                    </div>

                                </label>

                            ))}

                        </div>

                    </div>


                    {/* PREVIEW */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">

                        <h2 className="mb-4 text-base font-bold text-gray-900">
                            Product Preview
                        </h2>

                        <div className="overflow-hidden rounded-xl border border-gray-100">

                            <div className="flex aspect-square items-center justify-center bg-gray-100">

                                {previewImages.length > 0 ? (

                                    <img
                                        src={
                                            typeof previewImages[0] === 'string'
                                                ? previewImages[0]
                                                : previewImages[0].preview
                                        }
                                        alt={formData.name}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <MdImage
                                        size={50}
                                        className="text-gray-300"
                                    />

                                )}

                            </div>


                            <div className="p-4">

                                <p className="mb-1 text-xs text-gray-400">
                                    {formData.category || 'Category'}
                                </p>

                                <h3 className="
                                    line-clamp-2
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                ">
                                    {formData.name || 'Product name'}
                                </h3>

                                <div className="mt-3 flex items-center gap-2">

                                    <span className="text-base font-bold text-green-600">
                                        ₦
                                        {Number(
                                            formData.price || 0
                                        ).toLocaleString()}
                                    </span>

                                    {formData.oldPrice && (

                                        <span className="text-xs text-gray-400 line-through">
                                            ₦
                                            {Number(
                                                formData.oldPrice
                                            ).toLocaleString()}
                                        </span>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PRODUCT ID */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">

                        <h2 className="mb-3 text-sm font-bold text-gray-900">
                            Product ID
                        </h2>

                        <p className="
                            break-all
                            rounded-lg
                            bg-gray-50
                            px-3
                            py-2
                            text-xs
                            text-gray-500
                        ">
                            {id}
                        </p>

                    </div>

                </div>

            </form>

        </div>
    )
}