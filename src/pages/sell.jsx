import React from 'react'
import {
    MdArrowForward,
    MdCheckCircle,
    MdInventory2,
    MdShoppingCart,
    MdPeople,
    MdBarChart,
    MdStorefront,
    MdTrendingUp,
    MdAdd,
    MdMoreHoriz,
    MdKeyboardArrowDown
} from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Sell() {
    const features = [
        {
            icon: MdInventory2,
            title: 'Inventory Management',
            description:
                'Keep track of your products, stock levels and low-stock items from one simple workspace.',
            iconStyle: 'bg-violet-50 text-violet-600'
        },
        {
            icon: MdShoppingCart,
            title: 'Sales & Orders',
            description:
                'Manage sales and orders while keeping your store operations organized.',
            iconStyle: 'bg-blue-50 text-blue-600'
        },
        {
            icon: MdPeople,
            title: 'Customer Management',
            description:
                'Keep your customer information organized and easily accessible whenever you need it.',
            iconStyle: 'bg-emerald-50 text-emerald-600'
        },
        {
            icon: MdBarChart,
            title: 'Business Analytics',
            description:
                'Understand how your store is performing with clear and useful business insights.',
            iconStyle: 'bg-orange-50 text-orange-600'
        }
    ]

    const stats = [
        {
            label: 'Total Sales',
            value: '₦2,485,000',
            change: '+12.5%',
            icon: MdTrendingUp
        },
        {
            label: 'Orders',
            value: '1,248',
            change: '+8.2%',
            icon: MdShoppingCart
        },
        {
            label: 'Products',
            value: '342',
            change: '+5.4%',
            icon: MdInventory2
        },
        {
            label: 'Customers',
            value: '856',
            change: '+10.1%',
            icon: MdPeople
        }
    ]

    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo */}
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

                    {/* Navigation */}
                    <nav className="hidden items-center gap-7 md:flex">
                        <a
                            href="#features"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            How it works
                        </a>

                        <a
                            href="#solutions"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Solutions
                        </a>

                        <a
                            href="#pricing"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Pricing
                        </a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/login"
                            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:block"
                        >
                            Login
                        </Link>

                        <Link
                            to="/store/register"
                            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Get Started
                            <MdArrowForward size={17} />
                        </Link>
                    </div>
                </div>
            </header>


            {/* Hero */}
            <section className="overflow-hidden border-b border-slate-100 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        {/* Hero Content */}
                        <div className="max-w-xl">

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                <span className="text-xs font-semibold text-slate-600">
                                    Built for modern businesses
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                Run your store
                                <span className="block text-emerald-600">
                                    with confidence.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
                                StorePilot gives you everything you need to
                                manage products, inventory, sales, customers
                                and your daily store operations in one place.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/store/register"
                                    className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                                >
                                    Start using StorePilot
                                    <MdArrowForward size={18} />
                                </Link>

                                <a
                                    href="#features"
                                    className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Explore features
                                </a>

                            </div>

                            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">

                                <div className="flex items-center gap-1.5">
                                    <MdCheckCircle className="text-emerald-500" />
                                    <span className="text-xs text-slate-500">
                                        Easy to use
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <MdCheckCircle className="text-emerald-500" />
                                    <span className="text-xs text-slate-500">
                                        Built for growing stores
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <MdCheckCircle className="text-emerald-500" />
                                    <span className="text-xs text-slate-500">
                                        Everything in one place
                                    </span>
                                </div>

                            </div>
                        </div>


                        {/* Product Preview */}
                        <div className="relative">

                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />

                            <div className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/70">

                                {/* Browser Header */}
                                <div className="flex h-10 items-center gap-2 border-b border-slate-100 px-3">

                                    <div className="flex gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                    </div>

                                    <div className="mx-auto hidden h-6 w-56 items-center justify-center rounded-md bg-slate-50 text-[9px] text-slate-400 sm:flex">
                                        storepilot.com/store/dashboard
                                    </div>

                                </div>


                                {/* Dashboard */}
                                <div className="bg-slate-50 p-4 sm:p-5">

                                    <div className="mb-5 flex items-center justify-between">

                                        <div>
                                            <p className="text-[9px] font-medium text-slate-400">
                                                Dashboard
                                            </p>

                                            <h3 className="mt-0.5 text-base font-bold text-slate-800">
                                                Good morning 👋
                                            </h3>
                                        </div>

                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                                            <MdPeople size={14} />
                                        </div>

                                    </div>


                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                                        {stats.map((stat) => {
                                            const Icon = stat.icon

                                            return (
                                                <div
                                                    key={stat.label}
                                                    className="rounded-lg border border-slate-100 bg-white p-2.5"
                                                >
                                                    <div className="flex items-center justify-between">

                                                        <span className="text-[8px] text-slate-400">
                                                            {stat.label}
                                                        </span>

                                                        <Icon
                                                            size={13}
                                                            className="text-slate-300"
                                                        />

                                                    </div>

                                                    <p className="mt-1 text-xs font-bold text-slate-700">
                                                        {stat.value}
                                                    </p>

                                                    <p className="mt-1 text-[8px] font-semibold text-emerald-500">
                                                        {stat.change}
                                                    </p>
                                                </div>
                                            )
                                        })}

                                    </div>


                                    {/* Dashboard Content */}
                                    <div className="mt-3 grid gap-3 sm:grid-cols-5">

                                        {/* Chart */}
                                        <div className="rounded-lg border border-slate-100 bg-white p-3 sm:col-span-3">

                                            <div className="flex items-center justify-between">

                                                <div>
                                                    <p className="text-[8px] text-slate-400">
                                                        Sales overview
                                                    </p>

                                                    <p className="mt-0.5 text-xs font-bold text-slate-700">
                                                        ₦2.48M
                                                    </p>
                                                </div>

                                                <button className="flex items-center gap-0.5 rounded border border-slate-100 px-1.5 py-1 text-[7px] text-slate-400">
                                                    This month
                                                    <MdKeyboardArrowDown size={11} />
                                                </button>

                                            </div>

                                            <div className="mt-4 flex h-28 items-end gap-2">

                                                {[35, 48, 42, 65, 54, 72, 61, 82, 75, 90, 78, 96].map(
                                                    (height, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-1 items-end"
                                                        >
                                                            <div
                                                                style={{
                                                                    height: `${height}%`
                                                                }}
                                                                className={`w-full rounded-t-sm ${
                                                                    index === 11
                                                                        ? 'bg-emerald-500'
                                                                        : 'bg-emerald-100'
                                                                }`}
                                                            />
                                                        </div>
                                                    )
                                                )}

                                            </div>

                                        </div>


                                        {/* Recent Orders */}
                                        <div className="rounded-lg border border-slate-100 bg-white p-3 sm:col-span-2">

                                            <div className="flex items-center justify-between">
                                                <p className="text-[8px] text-slate-400">
                                                    Recent orders
                                                </p>

                                                <MdMoreHoriz
                                                    size={14}
                                                    className="text-slate-300"
                                                />
                                            </div>

                                            <div className="mt-3 space-y-3">

                                                {[
                                                    ['#SP-1024', '₦85,000'],
                                                    ['#SP-1023', '₦42,500'],
                                                    ['#SP-1022', '₦120,000'],
                                                    ['#SP-1021', '₦28,000']
                                                ].map(([order, amount]) => (
                                                    <div
                                                        key={order}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div>
                                                            <p className="text-[8px] font-semibold text-slate-600">
                                                                {order}
                                                            </p>

                                                            <p className="text-[7px] text-slate-400">
                                                                Completed
                                                            </p>
                                                        </div>

                                                        <p className="text-[8px] font-semibold text-slate-700">
                                                            {amount}
                                                        </p>
                                                    </div>
                                                ))}

                                            </div>

                                        </div>

                                    </div>


                                    {/* Inventory */}
                                    <div className="mt-3 rounded-lg border border-slate-100 bg-white p-3">

                                        <div className="flex items-center justify-between">

                                            <div>
                                                <p className="text-[8px] text-slate-400">
                                                    Inventory
                                                </p>

                                                <p className="mt-0.5 text-xs font-bold text-slate-700">
                                                    Stock overview
                                                </p>
                                            </div>

                                            <button className="flex items-center gap-1 rounded bg-slate-900 px-2 py-1 text-[8px] font-semibold text-white">
                                                <MdAdd size={11} />
                                                Product
                                            </button>

                                        </div>

                                        <div className="mt-3 grid grid-cols-3 gap-2">

                                            <div className="rounded bg-emerald-50 p-2">
                                                <p className="text-[7px] text-emerald-600">
                                                    In stock
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-emerald-700">
                                                    284
                                                </p>
                                            </div>

                                            <div className="rounded bg-orange-50 p-2">
                                                <p className="text-[7px] text-orange-600">
                                                    Low stock
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-orange-700">
                                                    18
                                                </p>
                                            </div>

                                            <div className="rounded bg-red-50 p-2">
                                                <p className="text-[7px] text-red-500">
                                                    Out of stock
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-red-600">
                                                    7
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* Feature Intro */}
            <section
                id="features"
                className="border-b border-slate-100 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="max-w-2xl">

                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                            Everything you need
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Your entire store,
                            <br />
                            in one workspace.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                            StorePilot brings the essential tools for running
                            your business together so you can spend less time
                            managing systems and more time growing your store.
                        </p>

                    </div>


                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {features.map((feature) => {
                            const Icon = feature.icon

                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100"
                                >

                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.iconStyle}`}
                                    >
                                        <Icon size={20} />
                                    </div>

                                    <h3 className="mt-5 text-sm font-bold text-slate-800">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                        {feature.description}
                                    </p>

                                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-700">
                                        Learn more
                                        <MdArrowForward size={14} />
                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>
            </section>


            {/* How it works */}
            <section
                id="how-it-works"
                className="border-b border-slate-100 bg-slate-50"
            >
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="text-center">

                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                            Simple workflow
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                            Start managing your store in minutes.
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                            No complicated setup. Create your workspace,
                            organize your products and start managing your
                            business.
                        </p>

                    </div>


                    <div className="mt-12 grid gap-8 md:grid-cols-3">

                        {[
                            {
                                number: '01',
                                title: 'Create your store',
                                text: 'Set up your StorePilot workspace and add your business information.'
                            },
                            {
                                number: '02',
                                title: 'Add your products',
                                text: 'Create products, organize categories and configure your stock levels.'
                            },
                            {
                                number: '03',
                                title: 'Run your business',
                                text: 'Track sales, manage inventory, understand customers and monitor performance.'
                            }
                        ].map((step) => (
                            <div
                                key={step.number}
                                className="relative rounded-xl border border-slate-200 bg-white p-6"
                            >

                                <span className="text-3xl font-black text-slate-100">
                                    {step.number}
                                </span>

                                <h3 className="mt-4 text-base font-bold text-slate-800">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {step.text}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* Solutions */}
            <section
                id="solutions"
                className="border-b border-slate-100 bg-white"
            >
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">

                    <div>

                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                            Built for businesses
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            One system for the way your business works.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                            Whether you sell electronics, fashion, groceries,
                            accessories or other products, StorePilot gives
                            you a central place to manage your operations.
                        </p>

                        <div className="mt-7 space-y-4">

                            {[
                                'Organize products and categories',
                                'Monitor stock levels in real time',
                                'Track orders and sales',
                                'Understand your business performance'
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <MdCheckCircle
                                        size={18}
                                        className="shrink-0 text-emerald-500"
                                    />

                                    <span className="text-sm font-medium text-slate-600">
                                        {item}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Store overview
                                    </p>

                                    <h3 className="mt-1 text-lg font-bold text-slate-800">
                                        Your business at a glance
                                    </h3>
                                </div>

                                <MdBarChart
                                    size={24}
                                    className="text-emerald-500"
                                />

                            </div>

                            <div className="mt-5 space-y-4">

                                {[
                                    ['Revenue', '₦4,850,000', '72%'],
                                    ['Orders', '1,284', '58%'],
                                    ['Products', '342', '84%'],
                                    ['Customers', '856', '67%']
                                ].map(([label, value, width]) => (
                                    <div key={label}>

                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="text-xs font-medium text-slate-500">
                                                {label}
                                            </span>

                                            <span className="text-xs font-bold text-slate-700">
                                                {value}
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                            <div
                                                style={{ width }}
                                                className="h-full rounded-full bg-emerald-500"
                                            />

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* CTA */}
            <section className="bg-slate-900">

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

                        <div className="max-w-xl">

                            <h2 className="text-3xl font-bold tracking-tight text-white">
                                Ready to take control of your store?
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Start organizing your products, inventory,
                                sales and customers with StorePilot.
                            </p>

                        </div>

                        <Link
                            to="/store/register"
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                        >
                            Get started
                            <MdArrowForward size={18} />
                        </Link>

                    </div>

                </div>

            </section>


            {/* Footer */}
            <footer className="bg-white">

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                                    <MdStorefront size={18} />
                                </div>

                                <span className="font-bold text-slate-800">
                                    StorePilot
                                </span>

                            </div>

                            <p className="mt-2 text-xs text-slate-400">
                                Simple tools for better store management.
                            </p>

                        </div>


                        <div className="flex flex-wrap gap-5">

                            <a
                                href="#features"
                                className="text-xs font-medium text-slate-400 hover:text-slate-700"
                            >
                                Features
                            </a>

                            <a
                                href="#how-it-works"
                                className="text-xs font-medium text-slate-400 hover:text-slate-700"
                            >
                                How it works
                            </a>

                            <a
                                href="#solutions"
                                className="text-xs font-medium text-slate-400 hover:text-slate-700"
                            >
                                Solutions
                            </a>

                            <Link
                                to="/login"
                                className="text-xs font-medium text-slate-400 hover:text-slate-700"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} StorePilot. All rights reserved.
                        </p>
                    </div>

                </div>

            </footer>

        </div>
    )
}