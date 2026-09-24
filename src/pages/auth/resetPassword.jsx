import React, { useEffect, useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle,
    MdErrorOutline,
    MdLock,
    MdLockReset,
    MdStorefront,
    MdVisibility,
    MdVisibilityOff
} from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../contexts/userProvider'

export default function ResetPassword() {
    const navigate = useNavigate()
    const { token } = useParams()

    // Use null for loading state: null = verifying, true = valid, false = invalid
    const [tokenValid, setTokenValid] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        userId: "",
        password: '',
        confirmPassword: ''
    })

    const { validateToken, resetPassword, user } = useUser()

    useEffect(() => {
        let isMounted = true

        const verifyToken = async () => {
            try {
                // Await the asynchronous provider function
                const validation = await validateToken(token)

                if (isMounted) {
                    if (validation && validation.status === true) {
                        setTokenValid(true)
                        setFormData((prev) => ({ ...prev, userId: validation.userId }))
                    } else {
                        setTokenValid(false)
                    }
                }
            } catch (err) {
                if (isMounted) setTokenValid(false)
            }
        }

        if (token) {
            verifyToken()
        } else {
            setTokenValid(false)
        }

        return () => {
            isMounted = false
        }
    }, [token, validateToken])

    const [errors, setErrors] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

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

        setError('')
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            const result = await resetPassword(formData)
            if (result) {
                setSuccess(true)
            } else {
                setError('Unable to reset your password. Please try again.')
            }
        } catch (error) {
            console.error('RESET PASSWORD ERROR:', error)
            setError(
                error?.response?.data?.message ||
                'Unable to reset your password. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    if (user !== null) {
        navigate("/");
    }
    // 1. Loading state while validating token
    if (tokenValid === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex items-center gap-3 text-slate-600">
                    <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
                    <span className="text-sm font-medium">Verifying reset link...</span>
                </div>
            </div>
        )
    }

    // 2. Success screen
    if (success) {
        return (
            <div className="min-h-screen bg-slate-50">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                                <MdStorefront size={21} />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                StorePilot
                            </span>
                        </Link>
                    </div>
                </header>

                <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-12 sm:px-6 lg:items-center lg:py-16">
                    <div className="w-full max-w-md">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <MdCheckCircle size={30} />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Password reset successful
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Your StorePilot password has been updated successfully. You can now sign in with your new password.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Continue to Login
                                <MdArrowForward size={18} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    // 3. Invalid Token Screen
    if (!tokenValid) {
        return (
            <div className="min-h-screen bg-slate-50">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                                <MdStorefront size={21} />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                StorePilot
                            </span>
                        </Link>
                    </div>
                </header>

                <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-12 sm:px-6 lg:items-center lg:py-16">
                    <div className="w-full max-w-md">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                <MdErrorOutline size={30} />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Invalid link
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                The provided password reset link may have expired or does not exist. Kindly request a new reset link.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Continue to Login
                                <MdArrowForward size={18} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    // 4. Valid Token Password Form
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-2.5">
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

            <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-12 sm:px-6 lg:items-center lg:py-16">
                <div className="w-full max-w-md">
                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <MdLockReset size={29} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Create a new password
                        </h1>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Choose a new password for your StorePilot account. Make sure it is at least 8 characters long.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                        {error && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3.5">
                                <p className="text-xs leading-5 text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    New Password
                                </label>
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
                                        placeholder="At least 8 characters"
                                        autoComplete="new-password"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 ${errors.password
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >
                                        {showPassword ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <MdLock
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Repeat your new password"
                                        autoComplete="new-password"
                                        className={`h-11 w-full rounded-xl border bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 ${errors.confirmPassword
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-slate-200 focus:border-emerald-500'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >
                                        {showConfirmPassword ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Updating password...
                                    </>
                                ) : (
                                    <>
                                        Reset Password
                                        <MdArrowForward size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                            >
                                <MdArrowBack size={15} />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}