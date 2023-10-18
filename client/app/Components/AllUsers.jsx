'use client'

import React, { useState } from 'react'
import AccessChat from './AccessChat'

const AllUsers = ({ allUsers }) => {
    const [users,setUsers] = useState([])
    let temp = []
    const handleChange = (e)=>{
        allUsers.forEach((user)=>{

        })
        temp.push([]) 
    }
    return (
        <div className='px-4 my-3'>
            <h2 className='text-xl'>Connect with your friends</h2>
            <input type="text" className='focus:outline-none p-2 my-2 border-2 border-gray-300 rounded-xl' onChange={handleChange}/>
            <div className='flex flex-wrap gap-3 mt-3 px-3'>
                {
                    allUsers?.map(user => {
                        return (
                            <AccessChat user={user} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllUsers
