import Image from 'next/image'
import React from 'react'
import search from '../Assets/search.svg'
import menu from '../Assets/menu.svg'

const Navbar = () => {
    return (
        <nav className='bg-primary text-white sticky top-0 flex items-center justify-between px-4 pt-4 pb-24'>
            <div>
                <h1 className='text-2xl font-bold text-[#2f217d]'>ChitChat</h1>
                <h2>Hi, Shreedhar</h2>
            </div>
            <div className='flex items-center gap-2'>
                <Image alt='settings' src={search} width={'30'} />
                <Image alt='settings' src={menu} width={'25'} />
            </div>
        </nav>
    )
}

export default Navbar
