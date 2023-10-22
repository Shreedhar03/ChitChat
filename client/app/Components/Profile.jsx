'use client'

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import arrow from '../Assets/arrow.svg'
import { ChatContext } from '../Context/ChatContext'
import { useSearchParams } from 'react-router-dom'
import AccessChat from './AccessChat'

const Profile = ({ chatTitle, image, isGroupChat, groupUsers, admin }) => {
    const { showProfile, setShowProfile } = useContext(ChatContext)
    // const admin = groupUsers?.filter(user=>user.)
    return (
        <div className={`${showProfile ? '-translate-y-3 py-12' : 'translate-y-full'} overflow-scroll transition-all fixed max-w-[450px] items-center flex flex-col w-full h-screen bottom-0 border-t-2 bg-slate-50 border-primary`}>
            <Image src={arrow} alt='arrow' className='absolute top-8 left-4' width={25} onClick={() => setShowProfile(false)} />
            <div className='relative flex flex-col items-center'>
                <img src={image} alt='pic' className='self-center w-28 h-28 object-cover rounded-full z-50 mb-6' />
                <h1 className='text-3xl font-semibold text-primary'>{chatTitle}</h1>
                {
                    isGroupChat===true && <h2>Created by {admin}</h2>
                }
                <h1 className='text-lg mt-4'>
                    {
                        isGroupChat===true ? 'Group members' : "Can't talk. ChitChat only"
                    }
                </h1>

                <div className='grid grid-cols-2 gap-4 my-6'>
                    {
                        isGroupChat===true &&


                        groupUsers?.map(user => {
                            return (
                                <AccessChat user={user} createChat={false} />
                            )
                        })
                    }
                </div>
                {
                    isGroupChat===true &&
                    <button className='self-start rounded-lg px-4 py-2 bg-red-800 opacity-80 text-white'>Exit Group</button>
                }
            </div>


        </div>
    )
}

export default Profile
