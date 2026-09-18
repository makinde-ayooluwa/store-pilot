import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function SellerSidebarNav({ data }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="w-full">

            {/* Direct Link */}
            {!data.hasDropdown ? (

                <Link
                    to={data.link}
                    className="
                        w-full flex items-center
                        px-3 py-2.5
                        rounded-xl
                        text-white/70
                        hover:bg-white/10
                        hover:text-white
                        transition-all duration-200
                        group
                    "
                >
                    <div className="flex items-center gap-3">

                        {data.icon}

                        <span className="text-sm font-medium">
                            {data.title}
                        </span>

                    </div>
                </Link>

            ) : (

                /* Dropdown Nav */
                <>
                    <button
                        onClick={() => setOpen(!open)}
                        className="
                            w-full flex items-center justify-between
                            px-3 py-2.5
                            rounded-xl
                            text-white/70
                            hover:bg-white/10
                            hover:text-white
                            transition-all duration-200
                            group
                        "
                    >
                        <div className="flex items-center gap-3">

                            {data.icon}

                            <span className="text-sm font-medium">
                                {data.title}
                            </span>

                        </div>

                        <MdKeyboardArrowDown
                            size={20}
                            className={`
                                text-white/50
                                transition-transform duration-200
                                ${open ? 'rotate-180' : ''}
                            `}
                        />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="
                            ml-4
                            mt-1
                            pl-3
                            grid
                            border-l
                            border-white/10
                            space-y-1
                        ">
                            {data.dropdown.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.link}
                                    className="
                                        w-full
                                        text-left
                                        px-3
                                        py-2
                                        text-sm
                                        text-white/50
                                        hover:text-white
                                        transition
                                    "
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}

        </div>
    )
}