import React from 'react'
import axios from 'axios'
import { cookies } from 'next/headers'
import AllUsers from '../Components/AllUsers'
import Navbar from '../Components/Navbar'

let currentUser
const fetchUsers = async () => {

    const cookieStore = cookies()
    const token = cookieStore.get('jwt')
    console.log(token)
    let { data } = await axios.request({
        headers: {
            Authorization: `Bearer ${token.value}`
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDdlNWY1NWE0NGJhMDRlOGIyNjFlZSIsImlhdCI6MTY5NTQ4MTEzNSwiZXhwIjoxNjk4MDczMTM1fQ.5RzP8o0QT37tJBV9CSc-VBl6doFkQEO1i9ycfg33bzo`
        },
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_URL}/api/searchUser?keyword=''`
    })
    currentUser = data.currentUser
    // socket.emit("online",currentUser[0]._id,"6524ef61a3f3b15d71c601f2")

    return data.users
}

const Search = async() => {
  return (
    <>
    <Navbar currentUser={currentUser}/>
    <div>
      <AllUsers fetchUsers={fetchUsers} currentUser={currentUser}/>
    </div>
    </>
  )
}

export default Search
