'use client'

import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'

const LastSeen = () => {
    const { lastSeen } = useContext(ChatContext)
    return (
        <div className='text-center text-gray-300 flex items-center justify-center gap-1 mt-3'>
            <p className={`w-3 h-3 mt-[1px] bg-green-600 rounded-full`}></p>
            <p>{lastSeen}</p>
        </div>
    )
}

export default LastSeen
