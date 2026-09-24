import React, { useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdEmail,
    MdLock,
    MdVisibility,
    MdVisibilityOff,
    MdStorefront
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/userProvider'
import Swal from 'sweetalert2'

export default function Login() {
    const navigate = useNavigate()
    const { user, login } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })

    const [errors, setErrors] = useState({})

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

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            if (!validateForm()) return

            setLoading(true)
            const response = await login(formData)
            if (response.status == true) {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: response.message
                })
                setTimeout(() => {
                    setLoading(false)
                    navigate('/')
                }, 2000)
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: response.message
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                icon: "error",
                text: error.message
            })
        }
        finally {
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
                        to="/"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack size={17} />
                        Back to Store
                    </Link>

                </div>
            </header>

            {/* Main */}
            <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-10 sm:px-6">

                <div className="w-full max-w-md">

                    {/* Intro */}
                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <MdStorefront size={28} />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to continue shopping on StorePilot.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

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
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${errors.email
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-slate-700">
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <MdLock
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${errors.password
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                    >
                                        {showPassword ? (
                                            <MdVisibilityOff size={19} />
                                        ) : (
                                            <MdVisibility size={19} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember */}
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    value={formData?.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 accent-emerald-500"
                                />

                                <span className="text-xs text-slate-500">
                                    Remember me
                                </span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <MdArrowForward size={18} />
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-100" />

                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                New to StorePilot?
                            </span>

                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        {/* Register */}
                        <Link
                            to="/register"
                            className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Create an Account
                        </Link>

                    </div>

                    {/* Seller */}
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-center">
                        <p className="text-xs text-slate-500">
                            Want to sell products?
                        </p>

                        <Link
                            to="/sell"
                            className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            Start selling on StorePilot
                            <MdArrowForward size={15} />
                        </Link>
                    </div>

                    <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
                        By continuing, you agree to StorePilot's terms and
                        privacy policy.
                    </p>

                </div>
            </main>

        </div>
    )
}