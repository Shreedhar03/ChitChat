'use client'

import React, { useEffect, useState } from 'react'
import send from '../Assets/send.svg'
import camera from '../Assets/camera.svg'
import Image from 'next/image'
import axios from 'axios'
import io from 'socket.io-client'
import Message from './Message'
import moment from 'moment'
import Cookies from 'js-cookie'


let socket = io(`${process.env.NEXT_PUBLIC_URL}`)

const ChatContent = ({ chatId, token, chatBody }) => {
    // const allMessages =  fetchMessages(chatId).messages
    // console.log(allMessages)
    const [currentUser, setCurrentUser] = useState(Cookies.get('currentUser'))
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
        let { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/sendMessage`, { content: message, chatId, time, dated }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(data)
        console.log("-------------------", data, "-------------------")
        console.log(data.sender._id == currentUser)
        console.log("-------------------currentUser", currentUser, "-------------------")
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
        // let socket = io('process.env.NEXT_PUBLIC_URL')
        socket.on("message received", newMessageReceived => {
            console.log("newMessageReceived", newMessageReceived)
            console.log("received")
            setMessages([...messages, newMessageReceived])
        })
        socket.on("senderTyping", (user) => {
            console.log("user", user)
            console.log("currentUser", currentUser)
            if (currentUser != user) {
                setTyping(true)
                console.log("typing")
            }

        })
        socket.on("senderStoppedTyping", (user) => {
            console.log("user", user)
            console.log("currentUser", currentUser)
            if (currentUser != user) {
                setTyping(false)
                console.log("stop typing")
            }

        })
        // console.log(demo)
    })
    return (

        <>

            {
                messages.map((chat, key) => {
                    // return <Message message={chat.content} time="09:30 AM" role={"sender"} />
                    return <div key={key} className={`max-w-[192px] flex flex-col gap-1 my-2 ${(chat.sender._id == currentUser) ? 'self-end' : 'self-start'}`}>
                        <Message typing={typing} message={chat.content} id={chat._id} time={chat.time} role={chat.sender._id == currentUser ? "receiver" : "sender"} />
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

            <form onSubmit={handleSubmit} className="flex w-full max-w-[430px] overflow-hidden bg-slate-100 justify-evenly fixed bottom-0 mx-0 gap-3 p-4">
                <Image src={camera} alt='camera' className='w-2/12 h-12'/>
                <input type="text" value={message} onChange={handleChange} autoFocus={true} placeholder='Message' className='w-8/12 text-lg focus:outline-none rounded-xl px-4 py-2 bg-inherit transition-all shrink-0 placeholder:text-sm' />
                <Image src={send} alt='send' onClick={handleSubmit} className='w-2/12 h-12'/>
            </form>
        </>
    )
}

export default ChatContent

