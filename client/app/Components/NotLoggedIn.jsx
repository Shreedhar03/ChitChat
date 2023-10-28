import Image from 'next/image'
import React from 'react'
import logo from '../Assets/logo.svg'
import Link from 'next/link'

const NotLoggedIn = () => {
    return (
        <div className='h-screen flex flex-col bg-slate-200 gap-5 items-center justify-center'>
            <Image src={logo} />
            <h1 className='text-3xl font-bold text-[#1c274c]'>ChitChat</h1>
            <Link href={'/login'} className='text-2xl font-semibold text-gray-800'>Login</Link>
        </div>
    )
}

export default NotLoggedIn
