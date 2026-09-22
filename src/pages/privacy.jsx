import React from 'react'
import { Link } from 'react-router-dom'
import {
MdArrowBack,
MdPrivacyTip,
MdPerson,
MdSecurity,
MdInfo
} from 'react-icons/md'

export default function Privacy() {
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
                        <MdPrivacyTip size={25} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Privacy Policy
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Last updated: September 2026
                    </p>
                </div>

                <div className="space-y-8 text-sm leading-7 text-slate-600">

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            1. Information We Collect
                        </h2>

                        <p>
                            StorePilot may collect information such as your
                            name, email address, phone number, delivery
                            address and information related to your
                            purchases or store activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            2. How We Use Information
                        </h2>

                        <p>
                            Information may be used to provide platform
                            functionality, process orders, communicate with
                            users, improve the service and maintain account
                            security.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            3. Account Information
                        </h2>

                        <p>
                            You are responsible for keeping your account
                            credentials secure. Do not share your password
                            with other people.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            4. Orders and Transactions
                        </h2>

                        <p>
                            Information connected to orders may be stored so
                            that customers and sellers can view order
                            history, process purchases and provide customer
                            service.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            5. Cookies and Similar Technologies
                        </h2>

                        <p>
                            StorePilot may use browser storage, cookies or
                            similar technologies to remember preferences,
                            maintain sessions and improve the user
                            experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            6. Data Security
                        </h2>

                        <p>
                            We take reasonable measures to protect user
                            information. However, no internet-based system
                            can guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            7. Third-Party Services
                        </h2>

                        <p>
                            StorePilot may integrate with payment,
                            authentication, analytics, hosting or other
                            third-party services. Those services may process
                            information according to their own policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">
                            8. Your Choices
                        </h2>

                        <p>
                            Depending on the available features, you may
                            update account information, manage notification
                            preferences or request changes to your account.
                        </p>
                    </section>

                </div>

                <div className="mt-10 rounded-xl bg-slate-50 p-5">

                    <div className="flex gap-3">

                        <MdInfo
                            size={22}
                            className="mt-0.5 shrink-0 text-slate-700"
                        />

                        <div>
                            <p className="font-semibold text-slate-900">
                                Privacy matters
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                This page is a product-level privacy
                                placeholder for the StorePilot frontend.
                                Before launching publicly, replace it with
                                a legally reviewed policy that matches your
                                actual data collection, storage and
                                third-party services.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
)

}