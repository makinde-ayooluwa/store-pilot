import React from 'react'

export default function Loading({ page }) {
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
            </div>
        </div>
    )
}
