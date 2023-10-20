'use client'

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import arrow from '../Assets/arrow.svg'
import { ChatContext } from '../Context/ChatContext'
import { useSearchParams } from 'react-router-dom'

const Profile = ({chatTitle,image,isGroupChat}) => {
    const { showProfile, setShowProfile } = useContext(ChatContext)

    return (
        <div className={`${showProfile ? '-translate-y-3 py-12' : 'translate-y-full'} transition-all fixed max-w-[450px] items-center flex flex-col w-full h-screen bottom-0 border-t-2 bg-slate-50 border-primary`}>
            <Image src={arrow} alt='arrow' className='absolute top-8 left-4' width={25} onClick={() => setShowProfile(false)} />
            <div className='relative flex flex-col items-center'>
                <img src={image} alt='pic' className='self-center w-28 h-28 object-cover rounded-full z-50 mb-6' />
                <h1 className='text-3xl font-semibold text-primary'>{chatTitle}</h1>
                <h1 className='text-lg mt-2'>
                    {
                        isGroupChat ? 'Group Chat' : "Can't talk. ChitChat only"
                    }
                </h1>
            </div>

          
        </div>
    )
}

export default Profile
