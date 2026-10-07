import React, { useMemo, useState } from "react";
import {
    MdInventory2,
    MdSearch,
    MdAdd,
    MdRemove,
    MdSave,
    MdWarning,
    MdCheckCircle,
} from "react-icons/md";
import { useStore } from "../../contexts/storeProvider";
import StoreOnly from "../../components/storeOnly";

const StoreStockSettings = () => {
    const { products, editProduct } = useStore();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [stockChanges, setStockChanges] = useState({});
    const [saving, setSaving] = useState(false);

    const categories = useMemo(() => {
        const values = products
            .map((product) => product.category)
            .filter(Boolean);

        return ["all", ...new Set(values)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.sku
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "all" || product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    const getCurrentStock = (product) => {
        if (stockChanges[product._id] !== undefined) {
            return stockChanges[product._id];
        }

        return product.stock || 0;
    };

    const handleStockChange = (id, value) => {
        const stock = Math.max(0, Number(value) || 0);

        setStockChanges((prev) => ({
            ...prev,
            [id]: stock,
        }));
    };

    const increaseStock = (product) => {
        const currentStock = getCurrentStock(product);

        handleStockChange(
            product._id,
            currentStock + 1
        );
    };

    const decreaseStock = (product) => {
        const currentStock = getCurrentStock(product);

        handleStockChange(
            product._id,
            Math.max(0, currentStock - 1)
        );
    };

    const hasChanges = (product) => {
        return (
            stockChanges[product._id] !== undefined &&
            Number(stockChanges[product._id]) !== Number(product.stock || 0)
        );
    };

    const saveProductStock = async (product) => {
        if (!hasChanges(product)) return;

        const newStock = getCurrentStock(product);

        const result = await editProduct({
            _id: product._id,
            stock: newStock,
        });

        if (result?.status) {
            setStockChanges((prev) => {
                const updated = { ...prev };
                delete updated[product._id];
                return updated;
            });
        }
    };

    const saveAllChanges = async () => {
        const changedProducts = products.filter(hasChanges);

        if (!changedProducts.length) return;

        try {
            setSaving(true);

            for (const product of changedProducts) {
                await saveProductStock(product);
            }
        } finally {
            setSaving(false);
        }
    };

    const changedCount = products.filter(hasChanges).length;

    return (
        <StoreOnly>
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                                <MdInventory2 className="text-green-700 text-2xl" />
                            </div>

                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Stock Adjustment
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Update the stock quantity of your products
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={saveAllChanges}
                        disabled={changedCount === 0 || saving}
                        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition
                        ${changedCount > 0 && !saving
                                ? "bg-green-700 text-white hover:bg-green-800"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }
                    `}
                    >
                        <MdSave className="text-lg" />

                        {saving
                            ? "Saving..."
                            : `Save All Changes${changedCount ? ` (${changedCount})` : ""}`}
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">

                    <div className="flex flex-col lg:flex-row gap-3">

                        {/* Search */}
                        <div className="relative flex-1">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search product name or SKU..."
                                className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-11 px-4 border border-gray-200 rounded-lg outline-none focus:border-green-600 text-sm bg-white"
                        >
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item === "all" ? "All Categories" : item}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">
                            Total Products
                        </p>

                        <p className="text-2xl font-bold text-gray-900">
                            {products.length}
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">
                            Low Stock
                        </p>

                        <p className="text-2xl font-bold text-orange-600">
                            {
                                products.filter(
                                    (product) =>
                                        Number(product.stock || 0) <=
                                        Number(product.lowStockThreshold || 0)
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">
                            Unsaved Changes
                        </p>

                        <p className="text-2xl font-bold text-green-700">
                            {changedCount}
                        </p>
                    </div>

                </div>

                {/* Products */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                    {/* Desktop table header */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.5fr_100px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                        <span>Product</span>
                        <span>Category</span>
                        <span>Current Stock</span>
                        <span>Adjust Stock</span>
                        <span>Action</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="py-16 text-center">
                            <MdInventory2 className="mx-auto text-gray-300 text-5xl mb-3" />

                            <p className="text-gray-600 font-medium">
                                No products found
                            </p>

                            <p className="text-sm text-gray-400 mt-1">
                                Try changing your search or category filter.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">

                            {filteredProducts.map((product) => {
                                const currentStock = Number(product.stock || 0);
                                const newStock = getCurrentStock(product);
                                const threshold = Number(
                                    product.lowStockThreshold || 0
                                );

                                const isLowStock = newStock <= threshold;
                                const changed = hasChanges(product);

                                return (
                                    <div
                                        key={product._id}
                                        className={`p-4 sm:px-5 transition ${changed
                                                ? "bg-green-50/50"
                                                : "bg-white"
                                            }`}
                                    >

                                        {/* Desktop */}
                                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.5fr_100px] gap-4 items-center">

                                            {/* Product */}
                                            <div className="flex items-center gap-3 min-w-0">

                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                                        <MdInventory2 className="text-gray-400 text-xl" />
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">
                                                        {product.name}
                                                    </p>

                                                    {product.sku && (
                                                        <p className="text-xs text-gray-400">
                                                            SKU: {product.sku}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>

                                            {/* Category */}
                                            <span className="text-sm text-gray-600">
                                                {product.category || "Uncategorized"}
                                            </span>

                                            {/* Current Stock */}
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {currentStock}
                                                </p>

                                                {isLowStock && (
                                                    <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                        <MdWarning />
                                                        Low stock
                                                    </div>
                                                )}
                                            </div>

                                            {/* Adjustment */}
                                            <div className="flex items-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        decreaseStock(product)
                                                    }
                                                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                                >
                                                    <MdRemove />
                                                </button>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={newStock}
                                                    onChange={(e) =>
                                                        handleStockChange(
                                                            product._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-20 h-9 text-center border rounded-lg outline-none focus:border-green-600 ${changed
                                                            ? "border-green-500 bg-green-50"
                                                            : "border-gray-200"
                                                        }`}
                                                />

                                                <button
                                                    onClick={() =>
                                                        increaseStock(product)
                                                    }
                                                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                                >
                                                    <MdAdd />
                                                </button>

                                            </div>

                                            {/* Save */}
                                            <button
                                                onClick={() =>
                                                    saveProductStock(product)
                                                }
                                                disabled={!changed}
                                                className={`px-3 py-2 rounded-lg text-xs font-medium ${changed
                                                        ? "bg-green-700 text-white hover:bg-green-800"
                                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    }`}
                                            >
                                                Save
                                            </button>

                                        </div>

                                        {/* Mobile */}
                                        <div className="md:hidden">

                                            <div className="flex items-center gap-3 mb-4">

                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <MdInventory2 className="text-gray-400 text-xl" />
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">
                                                        {product.name}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        {product.sku
                                                            ? `SKU: ${product.sku}`
                                                            : product.category}
                                                    </p>
                                                </div>

                                            </div>

                                            <div className="flex items-center justify-between mb-4">

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Current Stock
                                                    </p>

                                                    <p className="font-semibold text-gray-900">
                                                        {currentStock}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400 mb-1">
                                                        New Stock
                                                    </p>

                                                    <div className="flex items-center gap-2">

                                                        <button
                                                            onClick={() =>
                                                                decreaseStock(
                                                                    product
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"
                                                        >
                                                            <MdRemove />
                                                        </button>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={newStock}
                                                            onChange={(e) =>
                                                                handleStockChange(
                                                                    product._id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-16 h-8 text-center border border-gray-200 rounded-lg outline-none focus:border-green-600"
                                                        />

                                                        <button
                                                            onClick={() =>
                                                                increaseStock(
                                                                    product
                                                                )
                                                            }
                                                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"
                                                        >
                                                            <MdAdd />
                                                        </button>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="flex items-center justify-between">

                                                {isLowStock ? (
                                                    <span className="flex items-center gap-1 text-xs text-orange-600">
                                                        <MdWarning />
                                                        Low stock
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-xs text-green-600">
                                                        <MdCheckCircle />
                                                        Stock healthy
                                                    </span>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        saveProductStock(product)
                                                    }
                                                    disabled={!changed}
                                                    className={`px-4 py-2 rounded-lg text-xs font-medium ${changed
                                                            ? "bg-green-700 text-white"
                                                            : "bg-gray-100 text-gray-400"
                                                        }`}
                                                >
                                                    Save
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>

            </div>
        </StoreOnly>
    );
};

export default StoreStockSettings;