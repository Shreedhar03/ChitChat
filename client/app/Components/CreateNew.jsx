'use client'

import React, { useState } from 'react'
import NewGroup from './NewGroup'
import NewChat from './NewChat'

const CreateNew = ({users,currentUser}) => {
    const [showNewGroup, setShowNewGroup] = useState(false)
    const [showNewChat, setShowNewChat] = useState(false)
    const handleClickChat = ()=>{
        setShowNewChat(!showNewChat)
    }
    const handleClickGroup = ()=>{
        setShowNewGroup(!showNewGroup)
    }
    return (
        <>
            <div className='absolute bottom-32 right-0 left-0 flex items-center justify-between p-2 gap-3'>
                {/* <h2 className='text-xl text-center my-3'>Connect with your friends</h2> */}
                <button className='bg-primary text-gray-100 px-2 py-3 rounded-lg w-1/2' onClick={handleClickChat}>New Chat</button>
                <button className='bg-primary text-gray-100 px-2 py-3 rounded-lg w-1/2' onClick={handleClickGroup}>New Group</button>
            </div>


            <NewGroup showNewGroup={showNewGroup} handleClickGroup={handleClickGroup} users={users} currentUser={currentUser}/>
            <NewChat showNewChat={showNewChat} handleClickChat={handleClickChat} users={users} currentUser={currentUser}/>
            
        </>
    )
}

export default CreateNew
