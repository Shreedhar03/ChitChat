'use client'

import React, { useState } from 'react'
import AccessChat from './AccessChat'

const AllUsers = ({ allUsers,createChat ,groupUsers, setGroupUsers}) => {
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
        <div className='px-2 my-1'>
            <div className=''>
                {/* <input type="text" value={searchVal} placeholder='search users' className='focus:outline-none py-1 px-2 my-2 border border-gray-300 placeholder:text-gray-300 text-gray-300 bg-inherit rounded-lg' onChange={handleChange} /> */}
            </div>
            
            <div className='grid grid-cols-2 gap-5 mt-8 px-1'>
                {
                    allUsers?.map(user => {
                        return (
                            <AccessChat user={user} createChat={createChat} groupUsers={groupUsers} setGroupUsers={setGroupUsers}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllUsers
