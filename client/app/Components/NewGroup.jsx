'use client'

import Image from 'next/image'
import React from 'react'
import back from '../Assets/leftArrow.svg'
import group from '../Assets/group.svg'

const NewGroup = ({ showNewGroup,handleClickGroup }) => {
    return (
        <div className={`absolute h-full bottom-0 right-0 left-0 backdrop-blur-2xl p-3 transition-all ${showNewGroup ? 'translate-y-0' : 'translate-y-full'}`}>
            <nav className='flex items-center gap-5'>
                <button onClick={handleClickGroup}>
                    <Image src={back} />
                </button>

                <div className='flex items-center gap-2'>
                <Image src={group}/>
                <h1 className='text-white font-medium text-xl text-center'>
                    New Group
                </h1>
                </div>
            </nav>
        </div>
    )
}

export default NewGroup
