import React, { useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle,
    MdEmail,
    MdLockReset,
    MdStorefront
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/userProvider'
import Swal from 'sweetalert2'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const { forgotPassword, user, requestToken, requestMail } = useUser()
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (!email.trim()) {
            Swal.fire({ text: 'Email address is required', title: "Error", icon: "error" })
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            Swal.fire({ text: 'Enter a valid email address', title: "Error", icon: "error" })
            return
        }

        setLoading(true)

        try {
            // Temporary frontend simulation.
            // Later this will call:
            // POST /api/auth/forgot-password

            const result = await forgotPassword({
                email
            });

            if (result.status) {
                const { token, status } = await requestToken(result.userId)
                if (status) {
                    const { status } = await requestMail(result.userId, token)
                    if (status) {
                        setSuccess(
                            'If an account exists with this email, a password reset link has been sent.'
                        )
                        setEmail('')
                        console.log(result)
                    }
                }
            } else {
                setError(
                    error?.response?.data?.message ||
                    'Something went wrong. Please try again.'
                )
                setEmail('')
            }
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                'Something went wrong. Please try again.'
            )
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    if (user !== null) {
        navigate("/");
    }
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
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
                        to="/login"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack size={17} />
                        Back to Login
                    </Link>

                </div>
            </header>

            {/* Main */}
            <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-12 sm:px-6 lg:items-center lg:py-16">

                <div className="w-full max-w-md">

                    {/* Intro */}
                    <div className="mb-7 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <MdLockReset size={29} />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Forgot your password?
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Enter the email address connected to your
                            StorePilot account and we'll send you a link
                            to reset your password.
                        </p>

                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        {/* Success */}
                        {success && (
                            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">

                                <MdCheckCircle
                                    size={20}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                />

                                <p className="text-xs leading-5 text-emerald-700">
                                    {success}
                                </p>

                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3.5">

                                <p className="text-xs leading-5 text-red-600">
                                    {error}
                                </p>

                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <MdEmail
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setError('')
                                            setSuccess('')
                                        }}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 ${error
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />

                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Sending reset link...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <MdArrowForward size={18} />
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Back to login */}
                        <div className="mt-6 border-t border-slate-100 pt-6 text-center">

                            <p className="text-xs text-slate-500">
                                Remember your password?
                            </p>

                            <Link
                                to="/login"
                                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                            >
                                Sign in instead
                                <MdArrowForward size={15} />
                            </Link>

                        </div>

                    </div>

                    <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
                        For your security, StorePilot does not reveal whether
                        an email address is registered.
                    </p>

                </div>

            </main>

        </div>
    )
}