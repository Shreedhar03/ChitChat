'use client'

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import search from '../Assets/search.svg'
import menu from '../Assets/menu.svg'
import { ChatContext } from '../Context/ChatContext'

const Navbar = ({ currentUser, flag }) => {

    // const {user,setUser} = useContext(ChatContext)


    const [searchVal, setSearchVal] = useState("")
    const [showSearch, setShowSearch] = useState(0)
    return (
        // <div className="relative">
        <nav className='bg-primary text-white flex items-center justify-between p-4 overflow-hidden'>
            <div>
                <h1 className='text-2xl font-bold text-[#2f217d]'>ChitChat</h1>
                <h2>Hi, {currentUser?.[0]?.fname}</h2>
            </div>
            <div className='flex items-center gap-2 overflow-hidden'>
                <div className='flex'>
                    {/* <input type="text" value={searchVal} onFocus={()=>{setShowSearch(1)}} onBlur={()=>{setShowSearch(0)}} onChange={(e)=>setSearchVal(e.target.value)} className={`group-hover:w-48 focus:w-48 group-hover:translate-x-6 w-0 p-0 bg-[#4f39ca] transition-all group-hover:px-4 group-hover:py-1 ${showSearch && 'px-4 translate-x-6'} focus:outline-none rounded-lg`} /> */}
                    <input type="text" value={searchVal} onBlur={() => { setShowSearch(0) }} onChange={(e) => setSearchVal(e.target.value)} className={`bg-[#4f39ca] transition-all ${showSearch ? 'px-4 translate-x-6 w-48' : 'p-0 translate-x-0 w-0'} focus:outline-none rounded-lg`} />
                    {flag && <Image alt='search' className={`group-hover:translate-x-24 ${showSearch && 'translate-x-24'}`} src={search} width={'30'} onClick={() => setShowSearch(1)} />}
                </div>
                {   flag &&

                    <div className='group'>
                        <Image alt='settings' className={`${showSearch && 'translate-x-24'}`} src={menu} width={'25'} />
                        {/* <ul className={`flex flex-col gap-2 text-black z-50 fixed top-12 right-6 rounded-xl overflow-hidden transition-all bg-slate-200`}>
                            <li>Settings</li>
                            <li>Settings</li>
                            <li>Settings</li>
                        </ul> */}
                    </div>
                }
            </div>
        </nav>
        // </div>

    )
}
// group-hover:max-h-[300px] group-hover:p-6 max-h-0 p-0
export default Navbar
