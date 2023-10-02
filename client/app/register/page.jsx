"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import upload from '../Assets/upload.svg'
import Spinner from '../Components/Spinner'
import Image from 'next/image'

const Register = () => {
    // console.log(process.env.CLOUDINARY_API)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [picConfirmMessage,setPicConfirmMessage]=useState('')
    const [userMessage,setUserMessage]=useState('')
    const [credentials, setCredentials] = useState({
        fname: "",
        lname: "",
        username: "",
        pass: "",
        conPass: "",
        pic: ""
    })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(credentials.pass!==credentials.conPass){
            setUserMessage("Passwords do not match")
            return
        }
        setLoading(true)
        console.log("submission started")
        let { data } = await axios.post(`https://chitchat-bbfi.onrender.com/api/register`, { ...credentials })
        console.log(data.success, "token : ", data.token)
        data.success && router.push('/login')
        setLoading(false)
    }
    const postImage = async (pic) => {
        console.log(pic)
        setPicConfirmMessage('')
        setLoading(true)
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "ChitChat");

            try {
                const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API, {
                    method: "post",
                    body: data,
                });
                const responseData = await response.json();
                // console.log(responseData.url.toString());
                setLoading(false)
                setPicConfirmMessage("Image Uploaded !")
                setCredentials({ ...credentials, pic: responseData.url.toString() });
            } catch (err) {
                setPicConfirmMessage("Error uploading image !")
                console.error(err);
                setLoading(false)
            }
        }

    }

    return (
        <div className='h-screen bg-primary flex flex-col items-center pt-12'>
            <h1 className='self-center font-bold text-2xl text-[#1c274c]'>Create an Account</h1>
            <form className='flex flex-col mt-12 gap-3' onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name='fname' value={credentials.fname} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-sm text-gray-900 font-semibold rounded-xl' placeholder='First Name' autoComplete='off' />
                <input type="text" onChange={handleChange} name='lname' value={credentials.lname} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-sm text-gray-900 font-semibold rounded-xl' placeholder='Last Name' autoComplete='off' />
                <input type="text" onChange={handleChange} name='username' value={credentials.username} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-sm text-gray-900 font-semibold rounded-xl' placeholder='Username' autoComplete='off' />
                <input type="password" onChange={handleChange} name='pass' value={credentials.pass} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-sm text-gray-900 font-semibold rounded-xl' placeholder='Password' autoComplete='off' />
                <input type="password" onChange={handleChange} name='conPass' value={credentials.conPass} required className='text-lg focus:outline-none px-3 py-2 bg-[#434086] placeholder:text-gray-400 placeholder:text-sm text-gray-900 font-semibold rounded-xl' placeholder='Confirm Password' autoComplete='off' />
                <p className='font-semibold text-red-400'>{userMessage}</p>
                <input type="file" name="pic" id="pic" className='hidden' onChange={(e) => postImage(e.target.files[0])} />
                <label htmlFor='pic' className='font-semibold flex items-center text-gray-800 my-2 gap-2 flex-row-reverse justify-end'>Profile Picture<Image src={upload} alt="upload" width={30}/></label>
                <p className='font-semibold text-green-400'>{picConfirmMessage}</p>
                <button type='submit' disabled={loading} className='bg-[#1c274c] flex justify-center py-2 font-semibold text-primary text-xl rounded-xl'>
                    {loading ? <Spinner /> : "Register"}
                </button>
            </form>
            <Link href={'/login'} className='mt-6 text-gray-800 font-semibold'>Already have an account? <span className="underline">Login</span></Link>
        </div>
    )
}

export default Register
