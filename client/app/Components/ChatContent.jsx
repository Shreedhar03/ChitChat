'use client'

import React, { useEffect, useState } from 'react'
import send from '../Assets/send.svg'
import camera from '../Assets/camera.svg'
import Image from 'next/image'
import axios from 'axios'
import io from 'socket.io-client'
import Message from './Message'
import moment from 'moment'


let socket = io('https://chitchat-bbfi.onrender.com')

const ChatContent = ({ chatId, token, currentUser, chatBody }) => {
    // const allMessages =  fetchMessages(chatId).messages
    // console.log(allMessages)
    const [messages, setMessages] = useState(chatBody.messages)
    const [message, setMessage] = useState("")
    const [time, setTime] = useState(moment().format("HH:mm"))
    const [dated, setDated] = useState(moment().format("DD MMM YYYY"))
    const [typing, setTyping] = useState(false)

    let typeTimeOut;

    const handleChange = (e) => {
        setMessage(e.target.value)
        clearTimeout(typeTimeOut)
        socket.emit('typing', chatId, currentUser)
        typeTimeOut = setTimeout(() => {
            socket.emit('stopTyping', chatId, currentUser)
        }, 2000)
    }
    const handleSubmit = async (e) => {
        setMessage("")
        setTyping(false)
        e.preventDefault()
        let { data } = await axios.post(`https://chitchat-bbfi.onrender.com/api/sendMessage`, { content: message, chatId, time, dated }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(data)
        socket.emit("new message", data, chatId)
        setMessages([...messages, data])
    }
    useEffect(() => {
        // window.scroll(0,document.getElementById('messageBody').scrollHeight)
        let div = document.getElementById('messageBodY')
        div.scroll({ top: div.scrollHeight })
    }, [messages])

    useEffect(() => {
        socket.emit("setup", currentUser)
        socket.on("connection", () => console.log("connection done"))
        socket.emit("join chat", chatId)

        // socket.on()
    }, [])

    useEffect(() => {
        setTime(moment().format("HH:mm"))
        setDated(moment().format("DD MMM YYYY"))
        console.log("socket")
        // let socket = io('https://chitchat-bbfi.onrender.com')
        socket.on("message received", newMessageReceived => {
            console.log("newMessageReceived", newMessageReceived)
            console.log("received")
            setMessages([...messages, newMessageReceived])
        })
        socket.on("senderTyping", (user) => {
            console.log("user", user)
            if (currentUser._id !== user) {
                setTyping(true)
                console.log("typing")
            }

        })
        socket.on("senderStoppedTyping", (user) => {
            console.log("user", user)
            if (currentUser !== user) {
                setTyping(false)
                console.log("stop typing")
            }

        })
        // console.log(demo)
    })
    return (

        <>

            {
                messages.map((chat,key) => {
                    // return <Message message={chat.content} time="09:30 AM" role={"sender"} />
                    return <div key={key}>
                        <Message typing={typing} message={chat.content} id={chat._id} time={chat.time} role={chat.sender._id === currentUser ? "receiver" : "sender"} />
                    </div>

                })
            }

            {
                typing &&
                <div className='w-20 p-2 text-sm rounded-lg flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 bg-primary animate-pulse rounded-full'></div>
                    <div className='w-4 h-4 bg-primary animate-pulse delay rounded-full'></div>
                    <div className='w-4 h-4 bg-primary animate-pulse rounded-full'></div>
                </div>
            }

            <form onSubmit={handleSubmit} className="flex w-full max-w-[450px] justify-end fixed bottom-0 gap-3 p-4 bg-slate-50">
                <Image src={camera} alt='camera' />
                <input type="text" value={message} onChange={handleChange} placeholder='Message' className='text-lg bg-slate-200 focus:outline-none rounded-xl px-4 py-2 w-[250px] transition-all shrink-0 placeholder:text-sm' />
                <button type="submit">
                    <Image src={send} alt='send' />
                </button>
            </form>
        </>
    )
}

export default ChatContent

