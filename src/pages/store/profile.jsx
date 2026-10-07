import React, { useEffect, useState } from "react";
import {
    MdStorefront,
    MdEdit,
    MdLocationOn,
    MdPhone,
    MdEmail,
    MdCalendarToday,
    MdVerified,
    MdCategory,
    MdClose,
    MdCloudUpload,
    MdSave,
    MdPerson,
    MdPublic,
    MdPayments,
} from "react-icons/md";
import axios from "axios";

import { useStore } from "../../contexts/storeProvider";
import { backendUrl } from "../../data/constants";
import Swal from "sweetalert2";

export default function StoreProfile({ categories }) {
    const {
        storeData,
        loading,
        checkStore,
        updateStore
    } = useStore();
    const countries = [

    ]
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        ownerName: "",
        ownerEmail: "",
        phone: "",
        category: "",
        location: "",
        description: "",
        address: "",
        currency: "",
        country: "",
        city: "",
        state: "",
    });

    // New uploaded files
    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);

    // Image previews
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Image URL
    |--------------------------------------------------------------------------
    */

    const getImageUrl = (image) => {
        if (!image) return null;

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        return `${backendUrl}/${image}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Load Store Data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!storeData) return;

        setFormData({
            _id: storeData._id || "",
            name: storeData.name || "",
            ownerName: storeData.ownerName || "",
            ownerEmail: storeData.ownerEmail || "",
            phone: storeData.phone || "",
            category: storeData.category || "",
            location: storeData.location || "",
            description: storeData.description || "",
            address: storeData.address || "",
            currency: storeData.currency || "",
            country: storeData.country || "",
            city: storeData.city || "",
            state: storeData.state || "",
        });

        setLogoPreview(
            getImageUrl(storeData.logo)
        );

        setBannerPreview(
            getImageUrl(storeData.banner)
        );
    }, [storeData]);

    /*
    |--------------------------------------------------------------------------
    | Handle Input
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Handle Logo
    |--------------------------------------------------------------------------
    */

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setLogoFile(file);

        const preview = URL.createObjectURL(file);

        setLogoPreview(preview);
    };

    /*
    |--------------------------------------------------------------------------
    | Handle Banner
    |--------------------------------------------------------------------------
    */

    const handleBannerChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setBannerFile(file);

        const preview = URL.createObjectURL(file);

        setBannerPreview(preview);
    };

    /*
    |--------------------------------------------------------------------------
    | Reset Form
    |--------------------------------------------------------------------------
    */

    const resetForm = () => {
        if (!storeData) return;

        setFormData({
            _id: storeData._id || "",
            name: storeData.name || "",
            ownerName: storeData.ownerName || "",
            ownerEmail: storeData.ownerEmail || "",
            phone: storeData.phone || "",
            category: storeData.category || "",
            location: storeData.location || "",
            description: storeData.description || "",
            address: storeData.address || "",
            currency: storeData.currency || "",
            country: storeData.country || "",
            city: storeData.city || "",
            state: storeData.state || "",
        });

        setLogoFile(null);
        setBannerFile(null);

        setLogoPreview(
            getImageUrl(storeData.logo)
        );

        setBannerPreview(
            getImageUrl(storeData.banner)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Cancel Editing
    |--------------------------------------------------------------------------
    */

    const handleCancel = () => {
        resetForm();
        setEditing(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Update Store
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!storeData?._id) {
            console.error("STORE ID NOT FOUND");
            return;
        }

        try {
            setSaving(true);

            const data = new FormData();

            data.append("_id", storeData._id);

            Object.entries(formData).forEach(
                ([key, value]) => {
                    data.append(key, value);
                }
            );

            if (logoFile) {
    data.append("images", logoFile);
}

if (bannerFile) {
    data.append("images", bannerFile);
}


            const response = await updateStore(data);
            console.log(
                "UPDATE STORE RESPONSE:",
                response
            );

            if (response.status) {
                await checkStore();

                setEditing(false);

                setLogoFile(null);
                setBannerFile(null);


                Swal.fire({
                    title: "Success",
                    text: response.message ||
                        "Store updated successfully",
                    icon: "success"
                })
                console.log(response)
            } else {

                Swal.fire({
                    title: "Error",
                    text: response.message ||
                        "Failed to update store",
                    icon: "error"
                })
                console.log(response)
            }
        } catch (error) {
            console.error(
                "UPDATE STORE ERROR:",
                error
            );

            console.error(
                "BACKEND ERROR:",
                error.response?.data
            );


            Swal.fire({
                title: "Error",
                text: error.response?.data?.message ||
                    "Failed to update store",
                icon: "error"
            })
        } finally {
            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="min-h-full flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">

                    <div className="
                        w-10 h-10
                        border-4
                        border-green-200
                        border-t-green-800
                        rounded-full
                        animate-spin
                    " />

                    <p className="text-sm text-gray-500">
                        Loading store profile...
                    </p>

                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | No Store
    |--------------------------------------------------------------------------
    */

    if (!storeData) {
        return (
            <div className="min-h-full flex items-center justify-center p-6">

                <div className="text-center">

                    <div className="
                        w-16 h-16
                        mx-auto
                        rounded-full
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        mb-4
                    ">
                        <MdStorefront className="text-3xl text-green-800" />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        No Store Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        We couldn't find your store information.
                    </p>

                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | EDIT MODE
    |--------------------------------------------------------------------------
    */

    if (editing) {
        return (
            <div className="min-h-full bg-gray-50 p-4 md:p-6 lg:p-8">

                {/* Header */}
                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mb-6
                ">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Store
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Update your store information
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-2.5
                            bg-white
                            border
                            border-gray-200
                            text-gray-700
                            rounded-lg
                            text-sm
                            font-medium
                            hover:bg-gray-50
                            transition
                        "
                    >
                        <MdClose className="text-lg" />

                        Cancel
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Images */}
                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-200
                        overflow-hidden
                        mb-6
                    ">

                        {/* Banner */}
                        <div className="
                            relative
                            h-48
                            md:h-60
                            bg-green-950
                        ">

                            {bannerPreview ? (
                                <img
                                    src={bannerPreview}
                                    alt="Store banner"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <div className="
                                    w-full
                                    h-full
                                    bg-gradient-to-r
                                    from-green-950
                                    to-green-800
                                " />
                            )}

                            <label
                                htmlFor="banner"
                                className="
                                    absolute
                                    right-4
                                    bottom-4
                                    cursor-pointer
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-2
                                    rounded-lg
                                    bg-white
                                    text-gray-800
                                    text-sm
                                    font-medium
                                    shadow
                                    hover:bg-gray-50
                                "
                            >
                                <MdCloudUpload className="text-lg" />

                                Change Banner
                            </label>

                            <input
                                id="banner"
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="hidden"
                            />

                        </div>

                        {/* Logo */}
                        <div className="
                            px-5
                            md:px-8
                            pb-6
                        ">

                            <div className="
                                -mt-14
                                relative
                                w-fit
                            ">

                                <div className="
                                    w-28
                                    h-28
                                    rounded-2xl
                                    bg-white
                                    border-4
                                    border-white
                                    shadow-md
                                    overflow-hidden
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Store logo"
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />
                                    ) : (
                                        <MdStorefront
                                            className="
                                                text-5xl
                                                text-green-900
                                            "
                                        />
                                    )}

                                </div>

                                <label
                                    htmlFor="logo"
                                    className="
                                        absolute
                                        -bottom-2
                                        -right-2
                                        w-9
                                        h-9
                                        rounded-full
                                        bg-green-900
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        cursor-pointer
                                        shadow
                                        hover:bg-green-800
                                    "
                                >
                                    <MdEdit />

                                    <input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                    />
                                </label>

                            </div>
                        </div>
                    </div>

                    {/* Store Information */}
                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-200
                        p-5
                        md:p-7
                        mb-6
                    ">

                        <h2 className="
                            text-base
                            font-semibold
                            text-gray-900
                            mb-5
                        ">
                            Store Information
                        </h2>

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">

                            <Input
                                label="Store Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            {/* <Input
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. Fashion"
                            /> */}
                            <label className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
            ">
                                Category
                            </label>
                            <select className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    focus:border-green-700
                    focus:ring-2
                    focus:ring-green-100
                " name="" value={formData.category}
                                onChange={handleChange} id="">
                                {categories.map((category) => (
                                    <option value={category.slug}>{category.name}</option>
                                ))}
                            </select>

                            <Input
                                label="Currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                placeholder="e.g. NGN"
                            />

                            <Input
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Ikeja, Lagos"
                            />

                            <div className="md:col-span-2">

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell customers about your store..."
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-200
                                        rounded-xl
                                        outline-none
                                        text-sm
                                        resize-none
                                        focus:border-green-700
                                        focus:ring-2
                                        focus:ring-green-100
                                    "
                                />

                            </div>

                        </div>
                    </div>

                    {/* Owner Information */}
                    {/* <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-200
                        p-5
                        md:p-7
                        mb-6
                    ">

                        <h2 className="
                            text-base
                            font-semibold
                            text-gray-900
                            mb-5
                        ">
                            Owner & Contact
                        </h2>

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">

                            <Input
                                label="Owner Name"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                            />

                            <Input
                                label="Owner Email"
                                name="ownerEmail"
                                type="email"
                                value={formData.ownerEmail}
                                onChange={handleChange}
                            />

                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>
                    </div> */}

                    {/* Address */}
                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-200
                        p-5
                        md:p-7
                        mb-6
                    ">

                        <h2 className="
                            text-base
                            font-semibold
                            text-gray-900
                            mb-5
                        ">
                            Store Address
                        </h2>

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">

                            <div className="md:col-span-2">

                                <Input
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />

                            </div>

                            <Input
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />

                            <Input
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />

                            <Input
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />

                            {/* <select className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    focus:border-green-700
                    focus:ring-2
                    focus:ring-green-100
                " name="country" id="" value={formData.country}
                                onChange={handleChange}>
                                <option value="">Select country</option>

    {countries.map((country) => (
        <option key={country.code} value={country.code}>
            {country.name}
        </option>
    ))}
                            </select> */}

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="
                        flex
                        justify-end
                        gap-3
                        pb-8
                    ">

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="
                                px-5
                                py-3
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                text-gray-700
                                text-sm
                                font-medium
                                hover:bg-gray-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                flex
                                items-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                bg-green-900
                                text-white
                                text-sm
                                font-medium
                                hover:bg-green-800
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >

                            {saving ? (
                                <>
                                    <span className="
                                        w-4
                                        h-4
                                        border-2
                                        border-white/40
                                        border-t-white
                                        rounded-full
                                        animate-spin"
                                    />

                                    Saving...
                                </>
                            ) : (
                                <>
                                    <MdSave className="text-lg" />

                                    Save Changes
                                </>
                            )}

                        </button>

                    </div>

                </form>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | VIEW MODE
    |--------------------------------------------------------------------------
    */

    const {
        name,
        logo,
        banner,
        ownerName,
        ownerEmail,
        phone,
        category,
        location,
        description,
        address,
        currency,
        verified,
        country,
        city,
        state,
        createdAt,
    } = storeData;

    return (
        <div className="
            min-h-full
            bg-gray-50
            p-4
            md:p-6
            lg:p-8
        ">

            {/* Header */}
            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-6
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-bold
                        text-gray-900
                    ">
                        Store Profile
                    </h1>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                    ">
                        Manage and view your store information
                    </p>

                </div>

                <button
                    onClick={() => setEditing(true)}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        bg-green-900
                        text-white
                        rounded-lg
                        text-sm
                        font-medium
                        hover:bg-green-800
                        transition
                    "
                >
                    <MdEdit className="text-lg" />

                    Edit Store
                </button>

            </div>

            {/* Main Card */}
            <div className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                overflow-hidden
            ">

                {/* Banner */}
                <div className="
                    relative
                    h-44
                    md:h-56
                    bg-green-950
                ">

                    {getImageUrl(banner) ? (
                        <img
                            src={getImageUrl(banner)}
                            alt={`${name} banner`}
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />
                    ) : (
                        <div className="
                            w-full
                            h-full
                            bg-gradient-to-r
                            from-green-950
                            to-green-800
                        " />
                    )}

                </div>

                {/* Store Identity */}
                <div className="
                    px-5
                    md:px-8
                    pb-7
                ">

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-end
                        gap-4
                        -mt-12
                        relative
                    ">

                        {/* Logo */}
                        <div className="
                            w-24
                            h-24
                            md:w-28
                            md:h-28
                            shrink-0
                            rounded-2xl
                            bg-white
                            border-4
                            border-white
                            shadow-md
                            overflow-hidden
                            flex
                            items-center
                            justify-center
                        ">

                            {getImageUrl(logo) ? (
                                <img
                                    src={getImageUrl(logo)}
                                    alt={`${name} logo`}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <MdStorefront className="
                                    text-5xl
                                    text-green-900
                                " />
                            )}

                        </div>

                        {/* Name */}
                        <div className="pb-1">

                            <div className="
                                flex
                                items-center
                                gap-2
                            ">

                                <h2 className="
                                    text-xl
                                    md:text-2xl
                                    font-bold
                                    text-gray-900
                                ">
                                    {name || "Unnamed Store"}
                                </h2>

                                {verified && (
                                    <MdVerified className="
                                        text-green-700
                                        text-xl
                                    " />
                                )}

                            </div>

                            {category && (
                                <p className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">
                                    {category}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Description */}
                    {description && (
                        <div className="
                            mt-7
                            max-w-3xl
                        ">

                            <h3 className="
                                text-sm
                                font-semibold
                                text-gray-900
                                mb-2
                            ">
                                About the store
                            </h3>

                            <p className="
                                text-sm
                                leading-6
                                text-gray-600
                            ">
                                {description}
                            </p>

                        </div>
                    )}

                    {/* Store Information */}
                    <div className="mt-8">

                        <h3 className="
                            text-base
                            font-semibold
                            text-gray-900
                            mb-4
                        ">
                            Store Information
                        </h3>

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            gap-4
                        ">

                            <InfoCard
                                icon={<MdCategory />}
                                title="Category"
                                value={category}
                            />

                            <InfoCard
                                icon={<MdPayments />}
                                title="Currency"
                                value={currency}
                            />

                            <InfoCard
                                icon={<MdLocationOn />}
                                title="Location"
                                value={location}
                            />

                            <InfoCard
                                icon={<MdPerson />}
                                title="Owner"
                                value={ownerName}
                            />

                            <InfoCard
                                icon={<MdEmail />}
                                title="Owner Email"
                                value={ownerEmail}
                            />

                            <InfoCard
                                icon={<MdPhone />}
                                title="Phone"
                                value={phone}
                            />

                            <InfoCard
                                icon={<MdLocationOn />}
                                title="Address"
                                value={address}
                            />

                            <InfoCard
                                icon={<MdPublic />}
                                title="Country"
                                value={country}
                            />

                            <InfoCard
                                icon={<MdLocationOn />}
                                title="City / State"
                                value={[
                                    city,
                                    state,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                            />

                            <InfoCard
                                icon={<MdCalendarToday />}
                                title="Store Created"
                                value={
                                    createdAt
                                        ? new Date(
                                            createdAt
                                        ).toLocaleDateString(
                                            "en-NG",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )
                                        : null
                                }
                            />

                        </div>
                    </div>

                    {/* Store Status */}
                    <div className="
                        mt-8
                        pt-6
                        border-t
                        border-gray-100
                    ">

                        <h3 className="
                            text-base
                            font-semibold
                            text-gray-900
                            mb-4
                        ">
                            Store Status
                        </h3>

                        <div className="
                            flex
                            flex-wrap
                            gap-3
                        ">

                            <StatusBadge
                                label={
                                    verified
                                        ? "Verified Store"
                                        : "Not Verified"
                                }
                                active={verified}
                            />

                            <StatusBadge
                                label="Store Active"
                                active={true}
                            />

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Input Component
|--------------------------------------------------------------------------
*/

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
}) {
    return (
        <div>

            <label className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
            ">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    focus:border-green-700
                    focus:ring-2
                    focus:ring-green-100
                "
            />

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Information Card
|--------------------------------------------------------------------------
*/

function InfoCard({
    icon,
    title,
    value,
}) {
    return (
        <div className="
            border
            border-gray-200
            rounded-xl
            p-4
            bg-white
            hover:border-green-200
            transition
        ">

            <div className="
                flex
                items-center
                gap-3
            ">

                <div className="
                    w-10
                    h-10
                    shrink-0
                    rounded-lg
                    bg-green-50
                    text-green-800
                    flex
                    items-center
                    justify-center
                    text-xl
                ">
                    {icon}
                </div>

                <div className="min-w-0">

                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        {title}
                    </p>

                    <p className="
                        text-sm
                        font-medium
                        text-gray-800
                        truncate
                        mt-0.5
                    ">
                        {value || "Not provided"}
                    </p>

                </div>

            </div>
        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

function StatusBadge({
    label,
    active,
}) {
    return (
        <div
            className={`
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-lg
                text-xs
                font-medium
                ${active
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }
            `}
        >

            <span
                className={`
                    w-2
                    h-2
                    rounded-full
                    ${active
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }
                `}
            />

            {label}

        </div>
    );
}