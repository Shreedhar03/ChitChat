'use client'

import React, { useState } from 'react'
import AccessChat from './AccessChat'

const AllUsers = ({ allUsers }) => {
    const [users, setUsers] = useState([])
    const [searchVal,setSearchVal] = useState("")
    let temp = []
    const handleChange = (e) => {
        searchVal.length<2 && setUsers([])
        setSearchVal(e.target.value)
        allUsers.forEach((user) => {
            console.log(user.fname)
            if(user.fname.toLowerCase().includes(searchVal.toLowerCase()) || user.lname.toLowerCase().includes(searchVal.toLowerCase())){
            temp.push(user)
            }
        })
        
        searchVal.length >=2 && setUsers(temp)
    }
    return (
        <div className='px-2 my-3'>
            <div className='flex flex-col items-center justify-center gap-2'>
                
                <input type="text" value={searchVal} placeholder='search here...' className='focus:outline-none p-2 my-2 border-2 border-gray-500 rounded-lg' onChange={handleChange} />
            </div>
            <div className='flex flex-wrap gap-3 mt-3 px-3'>
                {
                    users?.map(user => {
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
