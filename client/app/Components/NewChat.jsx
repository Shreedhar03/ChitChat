'use client'

import Image from 'next/image'
import React from 'react'
import back from '../Assets/leftArrow.svg'
import user from '../Assets/user.svg'
import AllUsers from './AllUsers'

const NewChat = ({ showNewChat, handleClickChat,users,currentUser }) => {
    return (
        <div className={`absolute h-full bottom-0 right-0 left-0 backdrop-blur-2xl p-3 transition-all ${showNewChat ? 'translate-y-0' : 'translate-y-full'}`}>
            <nav className='flex items-center gap-4'>
                <button onClick={handleClickChat}>
                    <Image src={back} />
                </button>
                <div className='flex items-center gap-2'>
                    <Image src={user} />
                    <h1 className='text-white font-medium text-xl text-center'>
                        New Chat
                    </h1>
                </div>
            </nav>


            <div>
                <AllUsers allUsers={users} currentUser={currentUser} />
            </div>

        </div>
    )
}

export default NewChat
