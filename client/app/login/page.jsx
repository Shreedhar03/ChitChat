"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'

const page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        username: "",
        pass: "",
    })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log("submission started")
        let { data } = await axios.post(`http://localhost:5000/api/login`, { ...credentials })
        console.log(data)
        data.success && router.push('/home')
        setLoading(false)
    }
    return (
        <div className='h-screen bg-primary flex flex-col items-center pt-12'>
            <h1 className='self-center font-bold text-2xl text-[#1c274c]'>Login to your Account</h1>
            <form className='flex flex-col mt-12 gap-3' onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name='username' value={credentials.username} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-[16px] text-gray-900 font-semibold rounded-xl' placeholder='Username' autoComplete='off' />
                <input type="text" onChange={handleChange} name='pass' value={credentials.pass} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-[16px] text-gray-900 font-semibold rounded-xl' placeholder='Password' autoComplete='off' />
                <button type='submit' disabled={loading} className='bg-[#1c274c] flex justify-center py-2 font-semibold text-primary text-xl rounded-xl'>
                    {loading ? <Spinner /> : "Proceed"}
                </button>
            </form>
            <Link href={'/register'} className='mt-6 underline text-gray-800 font-semibold'>Create Account</Link>
        </div>
    )
}

export default page
