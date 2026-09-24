import React, { useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle,
    MdEmail,
    MdLock,
    MdPerson,
    MdStorefront,
    MdVisibility,
    MdVisibilityOff
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/userProvider';
import Swal from 'sweetalert2';

export default function Register() {
    const navigate = useNavigate()
    const { user, register } = useUser();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        agree: false
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value
        }))

        setErrors((current) => ({
            ...current,
            [name]: ''
        }))
    }

    const selectRole = (role) => {
        setFormData((current) => ({
            ...current,
            role
        }))

        setErrors((current) => ({
            ...current,
            role: ''
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullname.trim()) {
            newErrors.fullname = 'Full name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.agree) {
            newErrors.agree = 'You must agree to continue'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)


        try {
            const result = await register(formData)

            console.log("REGISTER RESULT:", result)

            if (!result?.status) {
                console.log('====================================');
                console.log(result.message);
                console.log('====================================');
                Swal.fire({
                    title: "Error",
                    timer: 2000,
                    text: result?.message || "Registration error",
                    icon: "error"
                })
                return
            }

            setTimeout(() => {
                // Swal.fire("Success", result?.message || "Registration successful");
                Swal.fire({
                    title: "Success",
                    timer: 2000,
                    text: result?.message || "Registration successful",
                    icon: "success"
                })
                navigate('/')
            }, 2000);

        } catch (error) {
            console.log('====================================');
            console.log(error?.response?.data?.message || error?.message);
            console.log('====================================');
            console.log("REGISTER ERROR:", error)
            Swal.fire({ title: "Error", text: error?.response?.data?.message || error?.message || "Registration failed", icon: "error" });
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
                        to="/"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack size={17} />
                        Back to Store
                    </Link>

                </div>
            </header>

            {/* Main */}
            <main className="px-4 py-10 sm:px-6 lg:py-12">
                <div className="mx-auto w-full max-w-xl">

                    {/* Intro */}
                    <div className="mb-7 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <MdPerson size={28} />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Join StorePilot and start shopping from stores
                            across the marketplace.
                        </p>

                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Account Type */}
                            {/* <div>
                                <label className="mb-2 block text-xs font-semibold text-slate-700">
                                    Account Type
                                </label>

                                <div className="grid grid-cols-2 gap-3">

                                    <button
                                        type="button"
                                        onClick={() => selectRole('user')}
                                        className={`rounded-xl border p-4 text-left transition ${formData.role === 'user'
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                                                <MdPerson size={19} />
                                            </div>

                                            {formData.role === 'user' && (
                                                <MdCheckCircle
                                                    size={19}
                                                    className="text-emerald-500"
                                                />
                                            )}

                                        </div>

                                        <p className="mt-3 text-sm font-bold text-slate-900">
                                            Customer
                                        </p>

                                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                                            Shop products from stores.
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => selectRole('seller')}
                                        className={`rounded-xl border p-4 text-left transition ${formData.role === 'seller'
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                                                <MdStorefront size={19} />
                                            </div>

                                            {formData.role === 'seller' && (
                                                <MdCheckCircle
                                                    size={19}
                                                    className="text-emerald-500"
                                                />
                                            )}

                                        </div>

                                        <p className="mt-3 text-sm font-bold text-slate-900">
                                            Seller
                                        </p>

                                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                                            Create and manage a store.
                                        </p>
                                    </button>

                                </div>
                            </div> */}

                            {/* Names */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <MdPerson
                                            size={19}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            placeholder="Full name"
                                            className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 ${errors.fullname
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-slate-200 focus:border-emerald-500'
                                                }`}
                                        />
                                    </div>

                                    {errors.fullname && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.fullname}
                                        </p>
                                    )}
                                </div>



                            </div>

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
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 ${errors.email
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
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Password
                                </label>

                                <div className="relative">

                                    <MdLock
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="At least 8 characters"
                                        autoComplete="new-password"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 ${errors.password
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <MdLock
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Repeat your password"
                                        autoComplete="new-password"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 ${errors.confirmPassword
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >
                                        {showConfirmPassword ? (
                                            <MdVisibilityOff size={19} />
                                        ) : (
                                            <MdVisibility size={19} />
                                        )}
                                    </button>

                                </div>

                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Terms */}
                            <div>

                                <label className="flex cursor-pointer items-start gap-2.5">

                                    <input
                                        type="checkbox"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-500"
                                    />

                                    <span className="text-xs leading-5 text-slate-500">
                                        I agree to StorePilot's{' '}
                                        <Link
                                            to="/terms"
                                            className="font-semibold text-slate-700 hover:text-emerald-600"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            to="/privacy"
                                            className="font-semibold text-slate-700 hover:text-emerald-600"
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </span>

                                </label>

                                {errors.agree && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.agree}
                                    </p>
                                )}

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
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <MdArrowForward size={18} />
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Login */}
                        <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                            <p className="text-xs text-slate-500">
                                Already have an account?
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

                    {/* Seller CTA */}
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-center">
                        <p className="text-xs text-slate-500">
                            Want to start selling without creating a customer
                            account first?
                        </p>

                        <Link
                            to="/seller/register"
                            className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-600"
                        >
                            Go to Seller Registration
                            <MdArrowForward size={15} />
                        </Link>
                    </div>

                    <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
                        StorePilot accounts will later be securely connected
                        to the platform authentication system.
                    </p>

                </div>

            </main>
        </div>
    )
}