import Image from 'next/image'
import React from 'react'
import logo from '../Assets/logo.svg'

const NotLoggedIn = () => {
    return (
        <div className='h-screen flex flex-col bg-primary gap-5 items-center justify-center'>
            <Image src={logo} />
            <h1 className='text-3xl font-bold text-[#1c274c]'>ChitChat</h1>
            <p className='text-2xl font-semibold text-gray-300'>Please login to Continue</p>
        </div>
    )
}

export default NotLoggedIn
