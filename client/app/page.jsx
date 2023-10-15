import Image from 'next/image'
import React from 'react'
import logo from './Assets/logo.svg'
import Link from 'next/link'

const Welcome = () => {
  console.log("home page rendered")
    return (
        <div className='h-screen bg-primary flex flex-col items-center justify-center gap-4'>
            <Image src={logo} alt='logo'/>
            <h1 className='text-3xl font-bold text-[#1c274c] mb-8'>ChitChat</h1>
            <Link href={'/login'} className='bg-[#1c274c] text-xl font-semibold text-primary px-4 py-2'>Get Started</Link>
        </div>
    )
}

export default Welcome