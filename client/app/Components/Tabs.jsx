'use client'

import React, { useState } from 'react'

const HomeLayout = () => {
    const [tab,setTab] = useState(0)
    return (
        <div>
            <div className="z-10 flex items-center bg-slate-100 rounded-t-[50px] absolute right-0 left-0 bottom-0 justify-between text-lg pt-6">
                <button className={`bg-slate-100 w-1/2 py-2 rounded-t-[24px] border-b-[3px] ${!tab && 'border-primary'}`} onClick={()=>setTab(!tab)}>Chats</button>
                <button className={`bg-slate-100 w-1/2 py-2 rounded-t-[24px] border-b-[3px] ${tab && 'border-primary'}`} onClick={()=>setTab(!tab)}>Groups</button>
            </div>
        </div>
    )
}

export default HomeLayout
