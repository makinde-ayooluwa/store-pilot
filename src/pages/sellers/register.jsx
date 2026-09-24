import React, { useState } from 'react'
import {
    MdStorefront,
    MdPerson,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useResource } from '../../contexts/resourceProvider'
import { useUser } from "../../contexts/userProvider"
export default function SellerRegister() {
    const navigate = useNavigate()
    const { user, data } = useUser()
    const [formData, setFormData] = useState({
        storeName: '',
        ownerName: data?.fullname ?? '',
        email: data?.email ?? '',
        phone: data?.phone ?? '',
        category: '',
        location: '',
        description: ''
    })

    const [errors, setErrors] = useState({})

    const { categories } = useResource();

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((current) => ({
            ...current,
            [name]: value
        }))

        setErrors((current) => ({
            ...current,
            [name]: ''
        }))
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.storeName.trim()) {
            newErrors.storeName = 'Store name is required'
        }

        if (!formData.ownerName.trim()) {
            newErrors.ownerName = 'Your name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        }

        if (!formData.category) {
            newErrors.category = 'Select a category'
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Store location is required'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validate()) return

        // Temporary frontend flow.
        // Later this will send the data to:
        // POST /api/stores

        navigate('/seller/dashboard')
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}

            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link
                        to="/"
                        className="flex items-center gap-2.5"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                            <MdStorefront size={21} />
                        </div>

                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            StorePilot
                        </span>
                    </Link>

                    <Link
                        to="/sell"
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        <MdArrowBack size={18} />
                        Back
                    </Link>

                </div>
            </div>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

                    {/* Left */}

                    <div className="lg:pt-8">

                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                            <MdStorefront size={26} />
                        </div>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Start selling on StorePilot
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
                            Create your store and start showcasing your
                            products to customers.
                        </p>

                        <div className="mt-8 space-y-4">

                            {[
                                'Create your own online store',
                                'Manage products and inventory',
                                'Receive and manage customer orders',
                                'Track your store performance'
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <MdCheckCircle
                                        size={20}
                                        className="shrink-0 text-emerald-500"
                                    />

                                    <span className="text-sm text-slate-600">
                                        {item}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Form */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                        <div className="mb-7">
                            <h2 className="text-xl font-bold text-slate-900">
                                Create your store
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Tell us a little about your business.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Store name */}

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Store name
                                </label>

                                <div className="relative">
                                    <MdStorefront
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="storeName"
                                        value={formData.storeName}
                                        onChange={handleChange}
                                        placeholder="e.g. Tech Haven"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 ${errors.storeName
                                                ? 'border-red-300'
                                                : 'border-slate-200'
                                            }`}
                                    />
                                </div>

                                {errors.storeName && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.storeName}
                                    </p>
                                )}
                            </div>

                            {/* Owner */}

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Your name
                                </label>

                                <div className="relative">
                                    <MdPerson
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-slate-400 ${errors.ownerName
                                                ? 'border-red-300'
                                                : 'border-slate-200'
                                            }`}
                                    />
                                </div>

                                {errors.ownerName && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.ownerName}
                                    </p>
                                )}
                            </div>

                            {/* Email + phone */}

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Email address
                                    </label>

                                    <div className="relative">
                                        <MdEmail
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none focus:border-slate-400 ${errors.email
                                                    ? 'border-red-300'
                                                    : 'border-slate-200'
                                                }`}
                                        />
                                    </div>

                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Phone number
                                    </label>

                                    <div className="relative">
                                        <MdPhone
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="0800 000 0000"
                                            className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none focus:border-slate-400 ${errors.phone
                                                    ? 'border-red-300'
                                                    : 'border-slate-200'
                                                }`}
                                        />
                                    </div>

                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Category */}

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Store category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 ${errors.category
                                            ? 'border-red-300'
                                            : 'border-slate-200'
                                        }`}
                                >
                                    <option value="">
                                        Select a category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.slug}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            {/* Location */}

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Store location
                                </label>

                                <div className="relative">
                                    <MdLocationOn
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City or business location"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none focus:border-slate-400 ${errors.location
                                                ? 'border-red-300'
                                                : 'border-slate-200'
                                            }`}
                                    />
                                </div>

                                {errors.location && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.location}
                                    </p>
                                )}
                            </div>

                            {/* Description */}

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Store description
                                    <span className="ml-1 font-normal text-slate-400">
                                        (optional)
                                    </span>
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell customers what your store sells..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                                />
                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Create Store
                                <MdArrowForward size={19} />
                            </button>

                        </form>

                    </div>

                </div>

            </main>
        </div>
    )
}