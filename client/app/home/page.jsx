import React from 'react'
import Navbar from '../Components/Navbar'
import Chats from '../Components/Chats'
import Tabs from '../Components/Tabs'

const page = () => {
    return (
        <>
            <div className='sticky top-0'>
                    <Navbar />
                    <Tabs />
            </div>
            <Chats />
        </>
    )
}

export default page
