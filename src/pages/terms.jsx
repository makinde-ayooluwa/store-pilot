import React from 'react'
import { Link } from 'react-router-dom'
import {
MdArrowBack,
MdGavel,
MdStorefront,
MdShoppingCart,
MdSecurity
} from 'react-icons/md'

export default function Terms() {
return (
<div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

            <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
                <MdArrowBack size={19} />
                Back to StorePilot
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

                <div className="mb-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <MdGavel size={25} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Terms of Service
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Last updated: September 2026
                    </p>
                </div>

                <div className="space-y-8 text-sm leading-7 text-slate-600">

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            1. About StorePilot
                        </h2>

                        <p>
                            StorePilot is a marketplace platform that allows
                            customers to discover stores and products and
                            allows sellers to manage and sell their products
                            online.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            2. Using StorePilot
                        </h2>

                        <p>
                            You agree to provide accurate information when
                            creating an account and to use the platform only
                            for lawful purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            3. Customer Orders
                        </h2>

                        <p>
                            Customers are responsible for reviewing their
                            order information before completing a purchase.
                            Product availability, prices and delivery details
                            may vary between stores.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            4. Sellers
                        </h2>

                        <p>
                            Sellers are responsible for the accuracy of their
                            product information, pricing, inventory and
                            fulfillment of customer orders.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            5. Payments
                        </h2>

                        <p>
                            Payment options may vary depending on the store
                            and available payment providers. StorePilot may
                            update or introduce additional payment methods as
                            the platform develops.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            6. Prohibited Activities
                        </h2>

                        <p>
                            Users must not use StorePilot to engage in fraud,
                            impersonation, unauthorized access, malicious
                            activity, or activities that violate applicable
                            laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            7. Account Termination
                        </h2>

                        <p>
                            StorePilot may restrict or terminate accounts
                            that violate these terms or misuse the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            8. Changes to These Terms
                        </h2>

                        <p>
                            These terms may be updated as StorePilot adds
                            features or changes its services. Updated terms
                            will be published on this page.
                        </p>
                    </section>

                </div>

                <div className="mt-10 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">

                    <div className="rounded-xl bg-slate-50 p-4">
                        <MdStorefront
                            size={22}
                            className="mb-2 text-slate-700"
                        />
                        <p className="font-semibold text-slate-900">
                            Stores
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Discover businesses and sellers.
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <MdShoppingCart
                            size={22}
                            className="mb-2 text-slate-700"
                        />
                        <p className="font-semibold text-slate-900">
                            Shopping
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Browse and purchase products.
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <MdSecurity
                            size={22}
                            className="mb-2 text-slate-700"
                        />
                        <p className="font-semibold text-slate-900">
                            Safety
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Use the platform responsibly.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>
)

}