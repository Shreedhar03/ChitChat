import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import Chats from '../Components/Chats'
import Tabs from '../Components/Tabs'
import Image from 'next/image'
import plus from '../Assets/plus.svg'
import connect from '../Assets/connect.svg'
import { cookies } from 'next/headers'
import axios from 'axios'
import Link from 'next/link'
import io from 'socket.io-client'
let currentUser
let socket = io(`${process.env.NEXT_PUBLIC_URL}`)

async function fetchChats(token) {
    try {
        console.log("------x-x-x-x-x---Fetching All chats in /home---x-x-x-x------");
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetchChats`, {
            next: {
                revalidate: 0
            },
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        });

        const data = await response.json();

        currentUser = data.currentUser;

        return data.results;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default async function Home() {
    const cookieStore = cookies()   // this make Home.jsx as `dynamic rendering`
    const token = cookieStore.get('jwt')
    const chats = await fetchChats(token)
    // const users = await fetchUsers()
    // console.log("currentUser", currentUser)
    // console.log("=================Chats==================" , chats)
    return (
        <div className='max-w-[450px] h-screen mx-auto relative'>
            <Navbar currentUser={currentUser} flag={true} />
            <div className='sticky top-0'>
                <Tabs />
            </div>

            {/* <div className='my-4'>
                <Link href={'/search'} className='flex items-center justify-center gap-2'>
                    <p>Connect with your Friends</p>
                    <Image src={connect} alt='connect' />
                </Link>
            </div> */}

            <Chats chats={chats} currentUser={currentUser} />
            <Link href={'/search'}>
                <Image src={plus} alt='plus' className='fixed bottom-4 right-4' />
            </Link>
        </div>


    )
}
