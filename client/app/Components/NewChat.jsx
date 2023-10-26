'use client'

import Image from 'next/image'
import React from 'react'
import back from '../Assets/cross.svg'
import user from '../Assets/user.svg'
import AllUsers from './AllUsers'

const NewChat = ({ showNewChat, handleClickChat,users,currentUser,createChat }) => {
    return (
        <div className={`absolute h-full overflow-scroll bottom-0 right-0 left-0 bg-white p-3 transition-all ${showNewChat ? 'translate-x-0' : 'translate-x-full'}`}>
            <nav className='flex items-center gap-4 sticky top-0 bg-white'>
                <button onClick={handleClickChat}>
                    <Image src={back} />
                </button>
                <div className='flex items-center gap-1'>
                    <Image src={user} />
                    <h1 className='text-black font-medium text-lg text-center'>
                        New Chat
                    </h1>
                </div>
            </nav>


            <div>
                <AllUsers allUsers={users} currentUser={currentUser} createChat={true}/>
            </div>

        </div>
    )
}

export default NewChat
