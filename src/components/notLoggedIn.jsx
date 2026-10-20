import React from 'react'
import { MdError, MdHome, MdLogin, MdPerson } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginToView() {
  const navigate = useNavigate()
  return (
    <div className='w-full'>
      <div className="flex justify-center my-20">
        <div className="shadow-sm rounded p-3 w-95 justify-self-center text-center">
          <div className='text-center justify-self-center p-5'>
            <MdError className='text-red-600 text-7xl p-2 rounded-[15px] bg-red-200' />
          </div>
          <div>
            <h1 className='text-3xl p-2'>Access restricted</h1>
            <p className='p-2 text-gray-400 font-light'>You need to be logged in to view this page content</p>
          </div>
          <div className='p-4 flex justify-end'>
            {/* <button className='bg-green-950 text-white p-4 align-middle rounded-[10px] flex gap-4' to={"/login"}>
              <span>
                <MdHome size={30} />
              </span>
              <span className='text-[20px]'>Go home</span>
            </button> */}
            {/* <Link to={"/"} className='text-blue-700 flex align-super gap-2 justify-self-start'>
              <span>
                <MdHome size={30} />
              </span>
              <span>
                Go home
              </span>
            </Link> */}
            <button onClick={() => navigate("/login")} className='cursor-pointer bg-green-950 text-white rounded-[10px]' to={"/login"}>
              <div className='flex gap-4 p-2 align-middle '>
                <span>
                <MdLogin size={30} />
              </span>
              <span className='text-[20px]'>Login</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
