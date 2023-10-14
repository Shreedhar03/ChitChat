'use client'

import React, { useState } from 'react'

const HomeLayout = () => {
    const [tab, setTab] = useState(1)
    return (

            <div className="z-10 flex items-center bg-slate-100 justify-between text-lg pt-6">
                <button className={`bg-slate-100 w-1/2 py-2 rounded-t-[24px] border-b-[3px] ${tab===1 && 'border-primary'}`} onClick={() => setTab(1)}>Chats</button>
                <button className={`bg-slate-100 w-1/2 py-2 rounded-t-[24px] border-b-[3px] ${tab===2 && 'border-primary'}`} onClick={() => setTab(2)}>Groups</button>
            </div>
    )
}

export default HomeLayout
