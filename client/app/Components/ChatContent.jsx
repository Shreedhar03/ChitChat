'use client'

import React, { useContext, useEffect, useState } from 'react'
import send from '../Assets/send.svg'
import emoji from '../Assets/emoji.svg'
import Image from 'next/image'
import axios from 'axios'
import io from 'socket.io-client'
import Message from './Message'
import moment from 'moment'
import Cookies from 'js-cookie'
import { ChatContext } from '../Context/ChatContext'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


let socket = io(`${process.env.NEXT_PUBLIC_URL}`)

const ChatContent = ({ chatId, token, chatBody, currentUser }) => {
    const { lastSeen, setLastSeen } = useContext(ChatContext)
    // const allMessages =  fetchMessages(chatId).messages
    // console.log(allMessages)
    // const [currentUser, setCurrentUser] = useState(Cookies.get('currentUser'))
    const [messages, setMessages] = useState(chatBody)
    const [message, setMessage] = useState("")
    const [time, setTime] = useState(moment().format("HH:mm"))
    const [dated, setDated] = useState(moment().format("DD MMM YYYY"))
    const [typing, setTyping] = useState(false)
    const [autoFocus, setAutoFocus] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)

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
        setAutoFocus(true)
        setMessage("")
        setTyping(false)
        e.preventDefault()
        let { data } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/sendMessage`, { content: message, chatId, time, dated }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setMessages([...messages, data])
        socket.emit("new message", data, chatId)
        console.log(data)
        // console.log("-------------------", data, "-------------------")
        console.log(data.sender._id == currentUser)
        // console.log("-------------------currentUser", currentUser, "-------------------")
    }  
    const handleEmoji = (e)=>{
        console.log(e.native)
        setMessage(message + e.native)
    }
    useEffect(() => {
        // window.scroll(0,document.getElementById('messageBody').scrollHeight)
        let div = document.getElementById('messageBodY')
        div.scroll({ top: div.scrollHeight })

    }, [messages])

    useEffect(() => {
        console.log("mounted")
        // setLastSeen("online")
        socket.emit("setup", currentUser)
        socket.on("connection", () => console.log("connection done"))
        socket.emit("join chat", chatId)
        socket.emit("online", currentUser)

        return (() => {
            setLastSeen(moment().format("DD MMM") + " at " + moment().format("HH:mm"))
            console.log("un mounted", lastSeen)
            socket.emit("offline", currentUser, lastSeen)
        })
        // socket.on()
    }, [])

    useEffect(() => {
        setTime(moment().format("HH:mm"))
        setDated(moment().format("DD MMM YYYY"))
        // console.log("socket")
        // let socket = io('process.env.NEXT_PUBLIC_URL')
        socket.on("message received", newMessageReceived => {
            console.log("newMessageReceived", newMessageReceived)
            console.log("received")
            setMessages([...messages, newMessageReceived])
        })
        socket.on("senderTyping", (user) => {
            if (currentUser != user) {
                setTyping(true)
            }

        })
        socket.on("senderStoppedTyping", (user) => {
            // console.log("user", user);console.log("currentUser", currentUser)
            if (currentUser != user) {
                setTyping(false);// console.log("stop typing")
            }
        })
        socket.on("onlineUser", (user) => {
            console.log("user is online", user)
            console.log(currentUser, "in the room")
            // console.log("user", user);console.log("currentUser", currentUser)
            if (currentUser != user) {
                setLastSeen("online");// console.log("stop typing")
            }
        })

    })
    return (

        <>


            {
                messages.map((chat, key) => {

                    let isReceiver = chat?.sender?._id === currentUser
                    // console.log(`${chat.sender._id} , ${currentUser} = ${isReceiver}`)
                    // return <Message message={chat.content} time="09:30 AM" role={"sender"} />
                    return <div key={key} className={`max-w-[192px] flex flex-col gap-1 px-2 my-2 ${isReceiver ? 'self-end' : 'self-start'}`}>
                        <Message typing={typing} message={chat.content} id={chat._id} time={chat.time} role={isReceiver ? "receiver" : "sender"} />
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

            <div className='relative'>
                <div className={`absolute top-4 left-4 transition-all ${true ? 'max-h-[800px]' : 'max-h-0' }  overflow-hidden`}>
                    {showEmoji && <Picker data={data} onEmojiSelect={handleEmoji} onClickOutside={()=>setShowEmoji(false)}/>}
                </div>
                <form onSubmit={handleSubmit} className="flex w-full max-w-[450px] overflow-hidden bg-slate-200 rounded-[0px] justify-evenly fixed bottom-0 mx-0 gap-3 px-4 py-3">
                    <Image src={emoji} onClick={() => setShowEmoji(!showEmoji)} alt='camera' className='w-1/12 h-12' />
                    <input type="text" value={message} onChange={handleChange} autoFocus={"autoFocus"} placeholder='Message' className='w-8/12 text-lg focus:outline-none rounded-xll px-4 py-2 bg-inherit transition-all shrink-0 placeholder:text-sm' />
                    <Image src={send} alt='send' onClick={handleSubmit} className='w-1/12 h-12' />
                </form>
            </div>
        </>
    )
}

export default ChatContent

