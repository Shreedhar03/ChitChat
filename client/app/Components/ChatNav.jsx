'use client'

import React, { useContext } from 'react'
import arrow from '../Assets/leftArrow.svg';
import menu from '../Assets/menu1.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChatContext } from '../Context/ChatContext';


const ChatNav = (props) => {

    const router = useRouter()
    const { showProfile, setShowProfile } = useContext(ChatContext)

    // console.log(userImage)
    return (
        <>
            <nav className='bg-primary pt-5 pb-20 px-2 sticky top-0'>
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-3'>
                        <div onClick={() => router.replace('/home')} className='text-2xl text-gray-300'>
                            <Image src={arrow} alt='arrow' /> {/* BACK Button */}
                        </div>
                        <img src={props.userImage} className='w-10 h-10 object-cover rounded-full' alt='user' />
                        <h1 className='text-xl justify-self-center text-gray-300'>{props.sender}</h1>
                    </div>
                    <Image
                        src={menu}
                        alt='menu'
                        className='group'
                        onClick={() => setShowProfile(!showProfile)}
                    />
                </div>

                {/* <LastSeen /> */}
            </nav>

            <ul
                // ref={""}
                className={`flex flex-col gap-2 absolute rounded-xl ${false ? 'max-h-auto p-6' : 'max-h-0 p-0'
                    } top-12 overflow-hidden transition-all right-6 z-20 bg-slate-200`}
            >
                <li className='py-2 px-3'>Search</li>
                <li className='py-2 px-3'>Media</li>
                <li className='py-2 px-3'>Wallpaper</li>
                <li className='py-2 px-3'>Clear chat</li>
                <li className='py-2 px-3'>View Profile</li>
                {/* <li className='py-2 px-3' onClick={()=>{setShowProfile(true);setShowSetting(false)}}>View Profile</li> */}
            </ul>

        </>

    )
}

export default ChatNav
