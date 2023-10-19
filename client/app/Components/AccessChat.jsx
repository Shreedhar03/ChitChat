'use client'

import axios from 'axios'
import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

const AccessChat = ({ user }) => {
    const router = useRouter()
    
    const handleAccessChat = async (userId,name) => {
        console.log("access chat")
        const token = Cookies.get('jwt');

        const body = {
            userId
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/accessChat`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        router.replace(`/home`)
    };

    return (
        <div className='flex flex-col justify-center items-center shrink-0 w-[80px]' onClick={() => handleAccessChat(user._id,user.fname + " " + user.lname)}>
            <img src={user.pic} className='rounded-full w-12 h-12 object-cover' alt='user'/>
            <h1 className=''>{user.fname}</h1>
        </div>
    )
}

export default AccessChat
