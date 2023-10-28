import React from 'react'
import Link from 'next/link'

const Chats = (props) => {
    console.log("---------------------------------------------------")
    return (
        <div className='w-full'>
            {
                props.chats?.map((chat, key) => {
                    let userImage;
                    if (chat.isGroupChat) {
                        userImage = "https://t4.ftcdn.net/jpg/02/01/10/87/360_F_201108775_UMAoFXBAsSKNcr53Ip5CTSy52Ajuk1E4.jpg"
                    } else {
                        userImage = chat?.users[0]._id == props.currentUser?.[0]?._id ? chat?.users[1].pic : chat?.users[0].pic
                    }
                    let sender = chat.isGroupChat ? chat.chatName : (chat?.users[0]._id == props.currentUser?.[0]?._id ? chat?.users[1].fname + " " + chat?.users[1].lname : chat?.users[0].fname + " " + chat?.users[0].lname)
                    let admin = chat.groupAdmin?.fname + " " + chat.groupAdmin?.lname
                    let users = chat.users ;
                    return (
                        <div className="flex items-center justify-between px-3 py-5 bg-slate-50" key={key}>
                            <div className='flex gap-3 items-start'>
                                <img src={userImage} alt='user' className='w-14 h-14 rounded-full object-cover' />
                                <div>
                                    <Link href={{
                                        pathname: `/chat`,
                                        query: {
                                            userImage,
                                            chatId: chat._id,
                                            sender,
                                            isGroupChat: chat.isGroupChat,
                                            users: JSON.stringify(users),
                                            admin
                                        }
                                    }}>
                                        <p className=''>{chat.isGroupChat ? chat.chatName : (chat?.users[0]._id == props.currentUser?.[0]?._id ? chat?.users[1].fname + " " + chat?.users[1].lname : chat?.users[0].fname + " " + chat?.users[0].lname)}</p>
                                        {/* <p className='text-gray-500'>{chat.latestMsg.slice(0, 30)}{chat.latestMsg.length > 30 && '...'}</p> */}
                                        <p className='text-gray-500 text-sm'>
                                            {
                                                chat?.isGroupChat ? <span>{chat?.latestMessage?.sender?._id !== props.currentUser[0]._id && chat?.latestMessage?.sender?.fname}: </span> : 
                                                <span>{chat?.latestMessage?.sender?._id === props.currentUser[0]._id && 'You: '}</span>
                                            }
                                            <span>
                                                {chat?.latestMessage?.content?.slice(0, 30)}{chat.latestMessage?.content?.length > 30 && '...'}
                                            </span>
                                        </p>
                                    </Link>

                                </div>
                            </div>
                            <div className='flex flex-col self-start gap-2'>
                                <p className='text-xs'>{chat.latestMessage?.time}</p>
                                {/* <p className='self-end text-xs bg-primary w-5 h-5 rounded-full flex justify-center items-center'>{chat.nos}</p> */}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats