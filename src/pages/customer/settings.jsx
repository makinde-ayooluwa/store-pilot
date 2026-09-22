import React, { useState } from 'react'
import {
    MdSettings,
    MdPersonOutline,
    MdLockOutline,
    MdNotificationsNone,
    MdVisibility,
    MdVisibilityOff,
    MdLogout,
    MdDeleteOutline,
    MdSave
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../../components/header'
import { useUser } from '../../contexts/userProvider'

export default function Settings() {
    const navigate = useNavigate()
    const { user } = useUser()

    const [activeSection, setActiveSection] = useState('profile')

    const [profile, setProfile] = useState({
        firstName: user?.firstName || 'Ayooluwa',
        lastName: user?.lastName || 'Makinde',
        email: user?.email || 'customer@example.com',
        phone: user?.phone || '+234 800 000 0000'
    })

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false)

    const [showNewPassword, setShowNewPassword] =
        useState(false)

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false)

    const [preferences, setPreferences] = useState({
        orderUpdates: true,
        promotions: true,
        productUpdates: false,
        emailNotifications: true,
        pushNotifications: true
    })

    const [message, setMessage] = useState('')

    const handleProfileChange = (e) => {
        const { name, value } = e.target

        setProfile((current) => ({
            ...current,
            [name]: value
        }))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target

        setPasswords((current) => ({
            ...current,
            [name]: value
        }))
    }

    const togglePreference = (name) => {
        setPreferences((current) => ({
            ...current,
            [name]: !current[name]
        }))
    }

    const saveProfile = (e) => {
        e.preventDefault()

        setMessage('Profile information saved successfully.')

        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const updatePassword = (e) => {
        e.preventDefault()

        if (
            !passwords.currentPassword ||
            !passwords.newPassword ||
            !passwords.confirmPassword
        ) {
            setMessage('Please fill in all password fields.')
            return
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage('New passwords do not match.')
            return
        }

        if (passwords.newPassword.length < 6) {
            setMessage(
                'Your new password must contain at least 6 characters.'
            )
            return
        }

        setPasswords({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })

        setMessage('Password updated successfully.')

        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const savePreferences = () => {
        setMessage('Notification preferences saved successfully.')

        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const handleLogout = () => {
        // Replace this with your real logout function
        // when the backend authentication is connected.
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link
                        to="/account"
                        className="hover:text-green-600"
                    >
                        Account
                    </Link>

                    <span>/</span>

                    <span className="text-gray-900">
                        Settings
                    </span>
                </div>

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center">
                            <MdSettings
                                size={24}
                                className="text-green-600"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Account Settings
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage your account and preferences
                            </p>
                        </div>
                    </div>
                </div>

                {/* Success / Error Message */}
                {message && (
                    <div className="mb-6 px-4 py-3 rounded-lg bg-green-50 border border-green-100 text-sm font-medium text-green-700">
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-100 p-2">

                            <button
                                onClick={() =>
                                    setActiveSection('profile')
                                }
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition ${
                                    activeSection === 'profile'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <MdPersonOutline size={20} />
                                Profile
                            </button>

                            <button
                                onClick={() =>
                                    setActiveSection('security')
                                }
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition ${
                                    activeSection === 'security'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <MdLockOutline size={20} />
                                Security
                            </button>

                            <button
                                onClick={() =>
                                    setActiveSection('notifications')
                                }
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition ${
                                    activeSection === 'notifications'
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <MdNotificationsNone size={20} />
                                Notifications
                            </button>

                            <div className="my-2 border-t border-gray-100" />

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left text-red-500 hover:bg-red-50 transition"
                            >
                                <MdLogout size={20} />
                                Logout
                            </button>
                        </div>
                    </aside>

                    {/* Content */}
                    <section className="lg:col-span-3">

                        {/* Profile */}
                        {activeSection === 'profile' && (
                            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-7">

                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Personal Information
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Update the information associated
                                        with your StorePilot account.
                                    </p>
                                </div>

                                <form onSubmit={saveProfile}>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profile.firstName}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profile.lastName}
                                                onChange={handleProfileChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                            />
                                        </div>

                                    </div>

                                    <div className="mb-5">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                                    >
                                        <MdSave size={19} />
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Security */}
                        {activeSection === 'security' && (
                            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-7">

                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Password & Security
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Keep your StorePilot account secure.
                                    </p>
                                </div>

                                <form onSubmit={updatePassword}>

                                    {/* Current */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={
                                                    showCurrentPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="currentPassword"
                                                value={
                                                    passwords.currentPassword
                                                }
                                                onChange={
                                                    handlePasswordChange
                                                }
                                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showCurrentPassword ? (
                                                    <MdVisibilityOff
                                                        size={20}
                                                    />
                                                ) : (
                                                    <MdVisibility
                                                        size={20}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* New */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={
                                                    showNewPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="newPassword"
                                                value={
                                                    passwords.newPassword
                                                }
                                                onChange={
                                                    handlePasswordChange
                                                }
                                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showNewPassword ? (
                                                    <MdVisibilityOff
                                                        size={20}
                                                    />
                                                ) : (
                                                    <MdVisibility
                                                        size={20}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="confirmPassword"
                                                value={
                                                    passwords.confirmPassword
                                                }
                                                onChange={
                                                    handlePasswordChange
                                                }
                                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            >
                                                {showConfirmPassword ? (
                                                    <MdVisibilityOff
                                                        size={20}
                                                    />
                                                ) : (
                                                    <MdVisibility
                                                        size={20}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                                    >
                                        <MdLockOutline size={19} />
                                        Update Password
                                    </button>
                                </form>

                                {/* Account Danger Zone */}
                                <div className="mt-10 pt-6 border-t border-gray-100">
                                    <h3 className="font-semibold text-gray-900">
                                        Account
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1 mb-4">
                                        Manage your StorePilot account.
                                    </p>

                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2.5 border border-red-200 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
                                    >
                                        <MdDeleteOutline size={19} />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeSection === 'notifications' && (
                            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-7">

                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Notification Preferences
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Choose which notifications you want
                                        to receive.
                                    </p>
                                </div>

                                <div className="space-y-1">

                                    <Preference
                                        title="Order Updates"
                                        description="Receive updates about your orders and delivery."
                                        checked={
                                            preferences.orderUpdates
                                        }
                                        onChange={() =>
                                            togglePreference(
                                                'orderUpdates'
                                            )
                                        }
                                    />

                                    <Preference
                                        title="Promotions"
                                        description="Receive special offers and promotions from StorePilot."
                                        checked={
                                            preferences.promotions
                                        }
                                        onChange={() =>
                                            togglePreference(
                                                'promotions'
                                            )
                                        }
                                    />

                                    <Preference
                                        title="Product Updates"
                                        description="Get updates about products you may be interested in."
                                        checked={
                                            preferences.productUpdates
                                        }
                                        onChange={() =>
                                            togglePreference(
                                                'productUpdates'
                                            )
                                        }
                                    />

                                    <Preference
                                        title="Email Notifications"
                                        description="Receive StorePilot notifications by email."
                                        checked={
                                            preferences.emailNotifications
                                        }
                                        onChange={() =>
                                            togglePreference(
                                                'emailNotifications'
                                            )
                                        }
                                    />

                                    <Preference
                                        title="Push Notifications"
                                        description="Receive notifications on your device."
                                        checked={
                                            preferences.pushNotifications
                                        }
                                        onChange={() =>
                                            togglePreference(
                                                'pushNotifications'
                                            )
                                        }
                                    />

                                </div>

                                <button
                                    onClick={savePreferences}
                                    className="mt-6 flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                                >
                                    <MdSave size={19} />
                                    Save Preferences
                                </button>
                            </div>
                        )}

                    </section>
                </div>

                {/* Back */}
                <div className="mt-8">
                    <Link
                        to="/account"
                        className="text-sm font-medium text-gray-600 hover:text-green-600"
                    >
                        ← Back to Account
                    </Link>
                </div>
            </main>
        </div>
    )
}


/* Preference Component */

function Preference({
    title,
    description,
    checked,
    onChange
}) {
    return (
        <div className="flex items-center justify-between gap-5 py-4 border-b border-gray-100 last:border-0">
            <div>
                <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    {description}
                </p>
            </div>

            <button
                type="button"
                onClick={onChange}
                className={`relative flex-shrink-0 w-11 h-6 rounded-full transition ${
                    checked
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                }`}
                aria-label={`Toggle ${title}`}
            >
                <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                        checked
                            ? 'left-6'
                            : 'left-1'
                    }`}
                />
            </button>
        </div>
    )
}