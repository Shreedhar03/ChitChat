import React from 'react'
import Message from './Message'
import send from '../Assets/send.svg'
import camera from '../Assets/camera.svg'
import Image from 'next/image'
import axios from 'axios'
import { cookies } from 'next/headers'

let currentUser

const fetchMessages = async (chatId) => {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')
    console.log("chatId", chatId)
    let { data } = await axios.get(`http://localhost:5000/api/allMessages/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    })
    currentUser = data.currentUser._id
    return data
}
const ChatBody = async ({ chatId }) => {

    const chatBody = await fetchMessages(chatId)
    console.log("------------Messages------------")
    console.log(chatBody)
    // useEffect(()=>{
    //     // window.scroll(0,document.getElementById('messageBody').scrollHeight)
    //     let div = document.getElementById('messageBodY')
    //     div.scroll({ top: div.scrollHeight })
    // },[])
    return (
        <>
            <div id='messageBodY' className='bg-slate-50 fixed flex flex-col top-28 rounded-t-[50px] h-screen w-full max-w-[450px] overflow-scroll pt-12 pb-64 px-3'>

                <p className='text-center my-6 bg-gray-200 self-center px-3 py-1 rounded-xl text-sm'>Today</p>

                {
                    chatBody.messages.map(chat=>{
                        // return <Message message={chat.content} time="09:30 AM" role={"sender"} />
                        return <Message message={chat.content} time="09:30 AM" role={chat.sender._id === currentUser ? "receiver" : "sender"} />
                    })
                }
                {/* <Message message="Hey there!" time="09:30 AM" role={"receiver"} /> */}
                {/* <Message message="Hi, I'm doing great. How about you?" time="10:00 AM" role={"sender"} />
                <Message message="I'm doing well too. Thanks for asking!" time="10:05 AM" role={"receiver"} />
                <Message message="What have you been up to lately?" time="10:10 AM" role={"receiver"} />
                <Message message="Just working on some coding projects.Just working on some coding projects.Just working on some coding projects." time="10:15 AM" role={"sender"} />
                <Message message="That sounds interesting. Tell me more about it." time="10:20 AM" role={"receiver"} />
                <Message message="Sure, I've been working on a new web app." time="10:25 AM" role={"sender"} />
                <Message message="What's the app about?" time="10:30 AM" role={"receiver"} />
                <Message message="It's a social networking platform." time="10:35 AM" role={"sender"} />
                <Message message="Sounds cool! When will it be ready?" time="10:40 AM" role={"receiver"} />
                <Message message="I'm hoping to launch it in a couple of months." time="10:45 AM" role={"sender"} />
                <Message message="Great! I can't wait to try it out." time="10:50 AM" role={"receiver"} /> */}
            </div>

            <div className="flex w-full max-w-[450px] justify-end fixed bottom-0 gap-3 p-4 bg-slate-50">
                <Image src={camera} alt='camera' />
                <input type="text" placeholder='Message' className='text-lg bg-slate-200 focus:outline-none rounded-xl px-4 py-2 w-[250px] transition-all shrink-0 placeholder:text-sm' />
                <Image src={send} alt='send' />
            </div>
        </>
    )
}

export default ChatBody


