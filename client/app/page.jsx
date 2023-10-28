import Image from 'next/image'
import React from 'react'
import logo from './Assets/logo.svg'
import Link from 'next/link'
import {cookies} from 'next/headers'

const Welcome = () => {
    const cookieStore = cookies()   // this make Home.jsx as `dynamic rendering`
    const token = cookieStore.get('jwt')
    console.log("-----jwt--------" , token?.value)
    console.log("home page rendered")
    return (
        <div className='h-screen bg-slate-200 flex flex-col items-center justify-center gap-4'>
            <Image src={logo} alt='logo'/>
            <h1 className='text-3xl font-bold text-[#1c274c] mb-8'>ChitChat</h1>
            <Link href={`${token ? '/home' : '/login' }`} className='bg-[#1c274c] text-xl font-semibold text-slate-200 rounded-xl px-4 py-2'>Get Started</Link>
        </div>
    )
}

export default Welcome