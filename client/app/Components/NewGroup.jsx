'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import back from '../Assets/cross.svg'
import group from '../Assets/group.svg'
import AllUsers from './AllUsers'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const NewGroup = ({ showNewGroup, handleClickGroup, users, currentUser }) => {

    const router = useRouter()
    const [chatName, setChatName] = useState("")
    const [groupUsers, setGroupUsers] = useState([])

    const createGroupChat = async () => {
        // create group
        console.log("group chat")
        const token = Cookies.get('jwt');

        const body = {
            users: groupUsers,
            chatName
        };

        console.log("body = " , body)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/createGroupChat`, body, {
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

    return (
        <div className={`absolute h-full overflow-scroll bottom-0 right-0 left-0 bg-white transition-all ${showNewGroup ? 'translate-x-0' : 'translate-x-full'}`}>
            <nav className='flex items-center p-3 justify-between sticky top-0 bg-white'>
                <div className='flex items-center gap-2'>
                    <button onClick={handleClickGroup}>
                        <Image src={back} />
                    </button>

                    <div className='flex items-center gap-1'>
                        <Image src={group} />
                        <h1 className='text-black font-medium text-lg text-center'>
                            New Group
                        </h1>
                    </div>
                </div>

                <button className='bg-primary text-white p-2 rounded-lg text-sm' onClick={createGroupChat}>
                    Create Group
                </button>

            </nav>

            <div className='flex items-end gap-5 my-8 mx-2'>
                <input type="text" placeholder='Group Title' value={chatName} onChange={e => setChatName(e.target.value)} className='w-3/5 text-lg bg-inherit px-2 py-1 focus:outline-none text-black placeholder:text-gray-600 placeholder:text-sm border-b-2 border-b-primary' />

            </div>


            <h2 className='text-lg text-black mt-2 px-2'>Select users</h2>

            <AllUsers allUsers={users} currentUser={currentUser} createChat={false} groupUsers={groupUsers} setGroupUsers={setGroupUsers} />


        </div>
    )
}

export default NewGroup
