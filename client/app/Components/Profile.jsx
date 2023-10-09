import Image from 'next/image'
import React, { useContext } from 'react'
import arrow from '../Assets/arrow.svg'
import { ChatContext } from '../Context/ChatContext'

const Profile = (props) => {
    // const {} = useContext(ChatContext)
    return (
        <div className={`${props.show ? '-translate-y-3 py-12' : 'translate-y-full'} transition-all fixed max-w-[450px] items-center flex flex-col w-full h-screen bottom-0 border-t-2 bg-slate-50 border-primary`}>
            <Image src={arrow} alt='arrow' className='absolute top-8 left-4' width={25} onClick={() => props.setShowProfile(false)} />
            <div className='relative flex flex-col items-center'>
                <img src={'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'} alt='pic' className='self-center w-32 rounded-full z-50 mb-6' />
                <h1 className='text-3xl font-semibold text-primary'>{user}</h1>
                <h1 className='text-lg mt-2'>Can't talk. ChitChat only</h1>
            </div>
        </div>
    )
}

export default Profile
