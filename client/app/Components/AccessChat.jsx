'use client'

import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

const AccessChat = ({ user, createChat, groupUsers, setGroupUsers }) => {
    const router = useRouter()
    

    const createSingleChat = async (userId, name) => {
        // create chat
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

    }

    const handleClick = () => {
        if (createChat) {
            createSingleChat(user._id, user.fname + " " + user.lname)
        }
        else {
            if (groupUsers?.includes(user)) {
                let temp = groupUsers?.filter(u => u._id !== user._id)
                groupUsers && setGroupUsers(temp)
            } else {
                groupUsers && setGroupUsers([...groupUsers, user])
            }

        }
    }

    return (
        <div className={`flex items-center gap-4 p-2 shrink-0 rounded-lg ${groupUsers?.includes(user) ? 'bg-primary text-gray-300 border border-primary  ' : 'bg-white border text-black border-primary'} `} onClick={handleClick}>
            <img src={user.pic} className='rounded-full w-14 h-14 object-cover' alt='user' />
            <h1>{user.fname} <br /> {user.lname}</h1>
        </div>
    )

};

export default AccessChat
