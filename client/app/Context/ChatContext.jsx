'use client'

import React, { useState } from 'react'
import { createContext } from "react"
import moment from 'moment'

export const ChatContext = createContext()

const ContextProvider = ({ children }) => {

    const [lastSeen, setLastSeen] = useState("")
    // const [lastSeen, setLastSeen] = useState(moment().format("DD MMM") + " at " + moment().format("HH:mm"))
    // const [lastSeen, setLastSeen] = useState("om")

    return (
        <ChatContext.Provider value={{ lastSeen, setLastSeen}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ContextProvider
