import React from 'react'
import AccessChat from './AccessChat'

const AllUsers = async ({ fetchUsers }) => {
    let allUsers = await fetchUsers()
    return (
        <div className='px-4 my-3'>
            <h2 className='text-xl'>Connect with your friends</h2>
            <div className='flex gap-3 overflow-scroll mt-3'>
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
