import React from 'react'
import { MdStorefront } from 'react-icons/md';

export default function Loading({ page }) {
    function FullPageLoader() {
        return (
            <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center text-center">
                    {/* Brand Icon */}
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10">
                        <MdStorefront size={28} />
                    </div>

                    {/* Brand Name */}
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">
                        StorePilot
                    </h1>

                    {/* Spinner & Message */}
                    <div className="mt-6 flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
                        <span className="text-xs font-medium text-slate-600">
                            Loading application...
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    function HomeLoader() {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50">
                {/* Main Animated Branding */}
                <div className="relative flex flex-col items-center">
                    {/* Brand Logo with bounce effect */}
                    <div className="mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
                        <MdStorefront size={36} />
                    </div>

                    {/* Brand Name */}
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        StorePilot
                    </h1>

                    {/* Progress Bar & Subtext */}
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full w-full origin-left-right animate-pulse bg-slate-900" />
                        </div>

                        <span className="text-xs font-medium text-slate-500">
                            Preparing your dashboard...
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    function ProfileSkeleton() {
        return (
            <div className="profile-skeleton">
                {/* Cover Banner */}
                <div className="skeleton-banner shimmer-wrapper">
                    <div className="shimmer" />
                </div>

                {/* Header Info Section */}
                <div className="skeleton-header">
                    {/* Profile Avatar */}
                    <div className="skeleton-avatar-container">
                        <div className="skeleton-avatar shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                    </div>

                    {/* Action Buttons (e.g., Edit Profile / Follow) */}
                    <div className="skeleton-actions">
                        <div className="skeleton-btn shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="skeleton-details">
                    {/* Name */}
                    <div className="skeleton-line name shimmer-wrapper">
                        <div className="shimmer" />
                    </div>

                    {/* Username / Handle */}
                    <div className="skeleton-line handle shimmer-wrapper">
                        <div className="shimmer" />
                    </div>

                    {/* Bio Paragraph */}
                    <div className="skeleton-bio">
                        <div className="skeleton-line bio-1 shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                        <div className="skeleton-line bio-2 shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                    </div>

                    {/* Stats Row (Posts, Followers, Following) */}
                    <div className="skeleton-stats">
                        <div className="skeleton-stat-item shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                        <div className="skeleton-stat-item shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                        <div className="skeleton-stat-item shimmer-wrapper">
                            <div className="shimmer" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    function LoadingList({ count = 10 }) {
        return (
            <div className="skeleton-container">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="skeleton-row">
                        {/* Avatar / Icon Placeholder */}
                        <div className="skeleton-avatar shimmer-wrapper">
                            <div
                                className="shimmer"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            />
                        </div>

                        {/* Text Content Block */}
                        <div className="skeleton-content">
                            <div className="skeleton-line title shimmer-wrapper">
                                <div
                                    className="shimmer"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                />
                            </div>
                            <div className="skeleton-line subtitle shimmer-wrapper">
                                <div
                                    className="shimmer"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                />
                            </div>
                        </div>

                        {/* End Action / Badge Placeholder */}
                        <div className="skeleton-badge shimmer-wrapper">
                            <div
                                className="shimmer"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className='w-full h-full'>
            <div className='m-5 p-5 flex justify-center'>
                {page == "profile" && <ProfileSkeleton />}
                {page == "homepage" && <FullPageLoader />}
            </div>
        </div>
    )
}
