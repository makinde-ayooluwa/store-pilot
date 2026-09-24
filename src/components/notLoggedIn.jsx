import React from 'react'
import { MdError, MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function LoginToView() {
  return (
    <div className='w-full'>
      <div className="flex justify-center my-20">
        <div className="shadow-sm rounded p-3 w-95 justify-self-center text-center">
          <div className='text-center justify-self-center p-5'>
            <MdError className='text-red-600 text-7xl border p-2 rounded' />
          </div>
          <div>
            <h1 className='text-2xl p-2'>This page is restricted</h1>
            <p className='p-2'>You need to be logged in to view this page content</p>
          </div>
          <div className='p-4'>
            <Link className='bg-green-950 text-white p-3 rounded-[10px]' to={"/login"}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
