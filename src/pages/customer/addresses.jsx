import React, { useState } from 'react'
import {
    MdAdd,
    MdLocationOn,
    MdEdit,
    MdDelete,
    MdCheckCircle,
    MdHome,
    MdBusiness,
    MdClose
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Header from '../../components/header'
import { UserOnly } from '../../components/userOnly'
import { useUser } from '../../contexts/userProvider'

const initialAddresses = [
    {
        id: 'address-001',
        type: 'Home',
        icon: 'home',
        firstName: 'Ayooluwa',
        lastName: 'Makinde',
        phone: '+234 800 000 0000',
        address: '12 Example Street',
        city: 'Lagos',
        state: 'Lagos',
        landmark: 'Near the main junction',
        isDefault: true
    }
]

const emptyForm = {
    type: 'Home',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    landmark: ''
}

export default function Addresses() {
    const [addresses, setAddresses] = useState(initialAddresses)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)
const {userLoading} = useUser();
    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((current) => ({
            ...current,
            [name]: value
        }))
    }

    const openAddForm = () => {
        setEditingId(null)
        setForm(emptyForm)
        setShowForm(true)
    }

    const openEditForm = (address) => {
        setEditingId(address.id)

        setForm({
            type: address.type,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            address: address.address,
            city: address.city,
            state: address.state,
            landmark: address.landmark || ''
        })

        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            !form.firstName.trim() ||
            !form.lastName.trim() ||
            !form.phone.trim() ||
            !form.address.trim() ||
            !form.city.trim() ||
            !form.state.trim()
        ) {
            return
        }

        if (editingId) {
            setAddresses((current) =>
                current.map((address) =>
                    address.id === editingId
                        ? {
                            ...address,
                            ...form
                        }
                        : address
                )
            )
        } else {
            const newAddress = {
                id: `address-${Date.now()}`,
                ...form,
                isDefault: addresses.length === 0
            }

            setAddresses((current) => [
                ...current,
                newAddress
            ])
        }

        closeForm()
    }

    const deleteAddress = (id) => {
        const addressToDelete = addresses.find(
            (address) => address.id === id
        )

        const remaining = addresses.filter(
            (address) => address.id !== id
        )

        if (addressToDelete?.isDefault && remaining.length > 0) {
            remaining[0].isDefault = true
        }

        setAddresses(remaining)
    }

    const setDefaultAddress = (id) => {
        setAddresses((current) =>
            current.map((address) => ({
                ...address,
                isDefault: address.id === id
            }))
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <UserOnly loading={userLoading}>
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link
                            to="/account"
                            className="hover:text-green-600"
                        >
                            Account
                        </Link>

                        <span>/</span>

                        <span className="text-gray-900">
                            Addresses
                        </span>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center">
                                    <MdLocationOn
                                        size={24}
                                        className="text-green-600"
                                    />
                                </div>

                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        My Addresses
                                    </h1>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Manage your delivery addresses
                                    </p>
                                </div>
                            </div>
                        </div>

                        {!showForm && (
                            <button
                                onClick={openAddForm}
                                className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                            >
                                <MdAdd size={20} />
                                Add Address
                            </button>
                        )}
                    </div>

                    {/* Address Form */}
                    {showForm && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 mb-8">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingId
                                            ? 'Edit Address'
                                            : 'Add New Address'}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Enter your delivery information below.
                                    </p>
                                </div>

                                <button
                                    onClick={closeForm}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <MdClose size={21} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>

                                {/* Address Type */}
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address Type
                                    </label>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setForm((current) => ({
                                                    ...current,
                                                    type: 'Home'
                                                }))
                                            }
                                            className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition ${form.type === 'Home'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <MdHome size={19} />
                                            Home
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setForm((current) => ({
                                                    ...current,
                                                    type: 'Office'
                                                }))
                                            }
                                            className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition ${form.type === 'Office'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <MdBusiness size={19} />
                                            Office
                                        </button>
                                    </div>
                                </div>

                                {/* Names */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+234 800 000 0000"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="House number and street"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>

                                {/* City + State */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State
                                        </label>

                                        <input
                                            type="text"
                                            name="state"
                                            value={form.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        />
                                    </div>
                                </div>

                                {/* Landmark */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Landmark
                                        <span className="text-gray-400 font-normal">
                                            {' '}
                                            (Optional)
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="landmark"
                                        value={form.landmark}
                                        onChange={handleChange}
                                        placeholder="Nearby landmark"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeForm}
                                        className="px-5 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                                    >
                                        {editingId
                                            ? 'Save Changes'
                                            : 'Save Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Addresses */}
                    {addresses.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-16 text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
                                <MdLocationOn
                                    size={38}
                                    className="text-gray-400"
                                />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900">
                                No saved addresses
                            </h2>

                            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                                Add a delivery address to make checkout
                                faster and easier.
                            </p>

                            <button
                                onClick={openAddForm}
                                className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                            >
                                <MdAdd size={19} />
                                Add Address
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className={`bg-white rounded-xl border p-5 ${address.isDefault
                                        ? 'border-green-300'
                                        : 'border-gray-100'
                                        }`}
                                >
                                    {/* Top */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                {address.type ===
                                                    'Office' ? (
                                                    <MdBusiness
                                                        size={21}
                                                        className="text-gray-600"
                                                    />
                                                ) : (
                                                    <MdHome
                                                        size={21}
                                                        className="text-gray-600"
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {
                                                            address.type
                                                        }
                                                    </h3>

                                                    {address.isDefault && (
                                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <button
                                                onClick={() =>
                                                    openEditForm(
                                                        address
                                                    )
                                                }
                                                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-green-600"
                                                title="Edit address"
                                            >
                                                <MdEdit size={18} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteAddress(
                                                        address.id
                                                    )
                                                }
                                                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500"
                                                title="Delete address"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="mt-5 text-sm text-gray-600 space-y-1.5">
                                        <p className="font-medium text-gray-900">
                                            {address.firstName}{' '}
                                            {address.lastName}
                                        </p>

                                        <p>{address.phone}</p>

                                        <p>{address.address}</p>

                                        <p>
                                            {address.city},{' '}
                                            {address.state}
                                        </p>

                                        {address.landmark && (
                                            <p>
                                                <span className="font-medium">
                                                    Landmark:
                                                </span>{' '}
                                                {address.landmark}
                                            </p>
                                        )}
                                    </div>

                                    {/* Default */}
                                    {!address.isDefault && (
                                        <button
                                            onClick={() =>
                                                setDefaultAddress(
                                                    address.id
                                                )
                                            }
                                            className="mt-5 flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
                                        >
                                            <MdCheckCircle size={18} />
                                            Set as default
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Back */}
                    <div className="mt-8">
                        <Link
                            to="/account"
                            className="text-sm font-medium text-gray-600 hover:text-green-600"
                        >
                            ← Back to Account
                        </Link>
                    </div>
                </main>
            </UserOnly>
        </div>
    )
}