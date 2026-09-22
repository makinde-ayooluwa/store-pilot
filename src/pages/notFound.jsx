import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
MdErrorOutline,
MdHome,
MdArrowBack
} from 'react-icons/md'

export default function NotFound() {
const location = useLocation()

return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-lg text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <MdErrorOutline size={42} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Error 404
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                Page not found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                The page you're looking for doesn't exist or may have
                been moved.
            </p>

            <p className="mt-3 break-all text-xs text-slate-400">
                {location.pathname}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    <MdHome size={19} />
                    Back Home
                </Link>

                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    <MdArrowBack size={19} />
                    Go Back
                </button>

            </div>

        </div>
    </div>
)

}