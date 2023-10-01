'use client'

import React, { useState } from 'react'
import { createContext } from "react"

export const ChatContext = createContext()

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState('Shreeedhar')

    return (
        <ChatContext.Provider value={{ user, setUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ContextProvider
