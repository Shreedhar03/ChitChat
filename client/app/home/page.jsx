import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import Chats from '../Components/Chats'
import Tabs from '../Components/Tabs'
import Image from 'next/image'
import plus from '../Assets/plus.svg'
import AllUsers from '../Components/AllUsers'
import { cookies } from 'next/headers'
import axios from 'axios'
import Link from 'next/link'
import io from 'socket.io-client'
let currentUser
let socket = io(`${process.env.NEXT_PUBLIC_URL}`)

// const fetchUsers = async () => {

//     const cookieStore = cookies()
//     const token = cookieStore.get('jwt')
//     console.log(token)
//     let { data } = await axios.request({
//         headers: {
//             Authorization: `Bearer ${token.value}`
//             // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDdlNWY1NWE0NGJhMDRlOGIyNjFlZSIsImlhdCI6MTY5NTQ4MTEzNSwiZXhwIjoxNjk4MDczMTM1fQ.5RzP8o0QT37tJBV9CSc-VBl6doFkQEO1i9ycfg33bzo`
//         },
//         method: "GET",
//         url: `${process.env.NEXT_PUBLIC_URL}/api/searchUser?keyword=''`
//     })
//     currentUser = data.currentUser
//     socket.emit("online",currentUser[0]._id,"6524ef61a3f3b15d71c601f2")

//     return data.users
// }
const fetchChats = async () => {
    // "use server"
    console.log("----Fetching Chats----")
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/fetchChats`, {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });
        // console.log("------x-x-x-x-x-x-x-x-x"  , data)
        currentUser = data.currentUser
        return data.results
    } catch (error) {
        console.error('Error:', error);
    }

}
const Home = async ({ params }) => {
    const chats = await fetchChats()
    // const users = await fetchUsers()
    console.log("currentUser", currentUser)
    // console.log("=================Chats==================" , chats)
    return (
        <div className='max-w-[450px] mx-auto'>
            <Navbar currentUser={currentUser} />
            <div className='sticky top-0'>
                <Tabs />
            </div>

            <p className='text-center my-4'>
                <Link href={'/search'}>Connect with your Friends</Link>
            </p>

            <Chats chats={chats} currentUser={currentUser} />
            {/* <Image src={plus} alt='plus' className='fixed bottom-4 right-4' /> */}
        </div>


    )
}

export default Home
