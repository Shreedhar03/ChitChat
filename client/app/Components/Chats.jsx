"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Chats = () => {

    const router = useRouter()

    const messagesData = [
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 2, sender: "Rahul", latestMsg: "I won't be attending lectures....!", time: "16:05" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 1, sender: "Alice", latestMsg: "Can you send me the notes from yesterday's class?", time: "16:12" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 4, sender: "David", latestMsg: "Sure, I'll send them right away.", time: "16:15" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 0, sender: "Emily", latestMsg: "Hey, how's it going?", time: "16:30" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 0, sender: "Sophia", latestMsg: "I heard there's an assignment due next week.", time: "16:45" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 1, sender: "Liam", latestMsg: "Yeah, I need to start working on it.", time: "17:02" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 1, sender: "Olivia", latestMsg: "Do you have any plans for the weekend?", time: "17:20" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 7, sender: "Mason", latestMsg: "Not yet, maybe we can go hiking.", time: "17:35" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 1, sender: "Ava", latestMsg: "Sounds like a great idea!", time: "17:45" },
        { photo: "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg", nos: 1, sender: "Ethan", latestMsg: "I'm in! Let's do it.", time: "18:00" }
    ]
    return (
        <div className='w-full'>
            {
                messagesData?.map((chat, key) => {
                    return (
                        <div className="flex items-center justify-between px-3 py-5 bg-slate-50" key={key}>
                            <div className='flex gap-3 items-start'>
                                <img src={chat.photo} alt='user' className='w-14 h-14 rounded-full object-cover' />
                                <div onClick={()=>router.push('/chat/yash')}>
                                    <p className=''>{chat.sender}</p>
                                    <p className='text-gray-500'>{chat.latestMsg.slice(0, 30)}{chat.latestMsg.length > 30 && '...'}</p>
                                </div>
                            </div>
                            <div className='flex flex-col self-start gap-2'>
                                <p className='text-xs'>{chat.time}</p>
                                <p className='self-end text-xs bg-primary w-5 h-5 rounded-full flex justify-center items-center'>{chat.nos}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats

