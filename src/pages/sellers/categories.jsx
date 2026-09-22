import React, { useState } from 'react'
import {
    MdAdd,
    MdSearch,
    MdEdit,
    MdDelete,
    MdCategory,
    MdMoreVert,
    MdInventory2,
    MdCheckCircle,
    MdClose,
    MdKeyboardArrowDown
} from 'react-icons/md'
import { useSeller } from '../../contexts/sellerProvider'

export default function SellerCategories() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [showModal, setShowModal] = useState(false)
    const [openMenu, setOpenMenu] = useState(null)

    const {categories, products} = useSeller()

    const [form, setForm] = useState({
        name: '',
        description: '',
        status: 'Active'
    })

    const filteredCategories = categories.filter(category => {
        const matchesSearch =
            category.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            category.description
                .toLowerCase()
                .includes(search.toLowerCase())

        const matchesStatus =
            statusFilter === 'All' ||
            category.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const totalProducts = products.length

    const activeCategories = categories.filter(
        category => category.status === 'Active'
    ).length

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name.trim()) return

        const newCategory = {
            id: Date.now(),
            name: form.name,
            description: form.description,
            products: 0,
            status: form.status
        }

        setCategories(prev => [...prev, newCategory])

        setForm({
            name: '',
            description: '',
            status: 'Active'
        })

        setShowModal(false)
    }

    const handleDelete = (id) => {
        setCategories(prev =>
            prev.filter(category => category.id !== id)
        )

        setOpenMenu(null)
    }

    return (
        <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-7">

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                        Categories
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Organize and manage your store products
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
                >
                    <MdAdd size={20} />
                    Add Category
                </button>

            </div>


            {/* Stats */}
            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Total */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <MdCategory size={23} />
                        </div>

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Total Categories
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {categories.length}
                            </h2>
                        </div>

                    </div>

                </div>


                {/* Active */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <MdCheckCircle size={23} />
                        </div>

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Active Categories
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {activeCategories}
                            </h2>
                        </div>

                    </div>

                </div>


                {/* Products */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <MdInventory2 size={23} />
                        </div>

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Total Products
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {totalProducts}
                            </h2>
                        </div>

                    </div>

                </div>

            </div>


            {/* Main Card */}
            <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Search */}
                    <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-slate-200 px-3 text-slate-400 transition focus-within:border-slate-400 sm:max-w-sm">

                        <MdSearch size={20} />

                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />

                    </div>


                    {/* Filter */}
                    <div className="relative">

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-slate-400 sm:w-32"
                        >
                            <option value="All">
                                All Status
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>
                        </select>

                        <MdKeyboardArrowDown
                            size={19}
                            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                    </div>

                </div>


                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[750px]">

                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                    Category
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                    Description
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                    Products
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                    Action
                                </th>

                            </tr>
                        </thead>


                        <tbody>

                            {filteredCategories.length > 0 ? (

                                filteredCategories.map(category => (

                                    <tr
                                        key={category.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50/60"
                                    >

                                        {/* Category */}
                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                                    <MdCategory size={19} />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {category.name}
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                                        ID #{category.id}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>


                                        {/* Description */}
                                        <td className="px-5 py-4">

                                            <p className="max-w-xs truncate text-sm text-slate-500">
                                                {category.description}
                                            </p>

                                        </td>


                                        {/* Products */}
                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-1.5 text-sm text-slate-600">

                                                <MdInventory2
                                                    size={16}
                                                    className="text-slate-400"
                                                />

                                                {category.products}

                                            </div>

                                        </td>


                                        {/* Status */}
                                        <td className="px-5 py-4">

                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                                    category.status === 'Active'
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-slate-100 text-slate-500'
                                                }`}
                                            >

                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        category.status === 'Active'
                                                            ? 'bg-emerald-500'
                                                            : 'bg-slate-400'
                                                    }`}
                                                />

                                                {category.status}

                                            </span>

                                        </td>


                                        {/* Actions */}
                                        <td className="px-5 py-4">

                                            <div className="relative flex justify-end">

                                                <button
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu === category.id
                                                                ? null
                                                                : category.id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                >
                                                    <MdMoreVert size={19} />
                                                </button>


                                                {openMenu === category.id && (

                                                    <div className="absolute right-0 top-10 z-30 w-32 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">

                                                        <button
                                                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-slate-600 transition hover:bg-slate-50"
                                                        >
                                                            <MdEdit size={16} />
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(category.id)
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-red-500 transition hover:bg-red-50"
                                                        >
                                                            <MdDelete size={16} />
                                                            Delete
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-5 py-20 text-center"
                                    >

                                        <div className="mx-auto flex max-w-xs flex-col items-center">

                                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                                <MdCategory size={27} />
                                            </div>

                                            <h3 className="text-sm font-semibold text-slate-700">
                                                No categories found
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                                Try changing your search or
                                                create a new category.
                                            </p>

                                            <button
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                                className="mt-4 flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                                            >
                                                <MdAdd size={17} />
                                                Add Category
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Footer */}
                <div className="border-t border-slate-100 px-5 py-3">

                    <p className="text-xs text-slate-400">
                        Showing{' '}
                        <span className="font-semibold text-slate-600">
                            {filteredCategories.length}
                        </span>{' '}
                        of{' '}
                        <span className="font-semibold text-slate-600">
                            {categories.length}
                        </span>{' '}
                        categories
                    </p>

                </div>

            </div>


            {/* Modal */}
            {showModal && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px]"
                    onClick={() => setShowModal(false)}
                >

                    <div
                        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-slate-100 p-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <MdCategory size={21} />
                                </div>

                                <div>

                                    <h2 className="text-base font-bold text-slate-800">
                                        Add Category
                                    </h2>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Create a new product category
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <MdClose size={19} />
                            </button>

                        </div>


                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-5"
                        >

                            {/* Name */}
                            <div className="mb-4">

                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Electronics"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                    }
                                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                    required
                                />

                            </div>


                            {/* Description */}
                            <div className="mb-4">

                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    placeholder="Describe this category..."
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description:
                                                e.target.value
                                        })
                                    }
                                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                />

                            </div>


                            {/* Status */}
                            <div className="mb-6">

                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value
                                        })
                                    }
                                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* Buttons */}
                            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                                >
                                    <MdAdd size={17} />
                                    Create Category
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    )
}