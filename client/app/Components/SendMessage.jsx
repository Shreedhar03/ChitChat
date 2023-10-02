'use client'

import React, { useEffect, useState } from 'react'
import send from '../Assets/send.svg'
import camera from '../Assets/camera.svg'
import Image from 'next/image'
import axios from 'axios'
import io from 'socket.io-client'

let socket = io('http://localhost:5000')

const SendMessage = ({chatId,token,currentUser}) => {

    const [message, setMessage] = useState("")
    const [demo,setDemo] = useState("")

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let {data} = await axios.post(`http://localhost:5000/api/sendMessage`, {content:message,chatId} , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        console.log(data)
        socket.emit("new message" , data)
    }

    useEffect(()=>{
        socket.emit("setup",currentUser)
        socket.on("connection",()=>console.log("connection done"))
        socket.emit("joinChat",chatId)
        socket.on()
    },[])
    
    useEffect(()=>{
        console.log("socket")
        // let socket = io('http://localhost:5000')
        socket.on("message received",(newMessageReceived=>{
            console.log(newMessageReceived)
            console.log("received")
        }))
        console.log(demo)
    })
    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-[450px] justify-end fixed bottom-0 gap-3 p-4 bg-slate-50">
            <Image src={camera} alt='camera' />
            <input type="text" value={message} onChange={handleChange} placeholder='Message' className='text-lg bg-slate-200 focus:outline-none rounded-xl px-4 py-2 w-[250px] transition-all shrink-0 placeholder:text-sm' />
            <button type="submit">
                <Image src={send} alt='send' />
            </button>
        </form>
    )
}

export default SendMessage
