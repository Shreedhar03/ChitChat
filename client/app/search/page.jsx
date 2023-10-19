import React from 'react'
import axios from 'axios'
import { cookies } from 'next/headers'
import AllUsers from '../Components/AllUsers'
import Navbar from '../Components/Navbar'
import connect from '../Assets/connectHero.svg'
import Image from 'next/image'
import Link from 'next/link'
import CreateNew from '../Components/CreateNew'

let currentUser
const fetchUsers = async (keyword) => {
  "use server"
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')
  console.log(token)
  let { data } = await axios.request({
    headers: {
      Authorization: `Bearer ${token.value}`
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDdlNWY1NWE0NGJhMDRlOGIyNjFlZSIsImlhdCI6MTY5NTQ4MTEzNSwiZXhwIjoxNjk4MDczMTM1fQ.5RzP8o0QT37tJBV9CSc-VBl6doFkQEO1i9ycfg33bzo`
    },
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_URL}/api/searchUser?keyword=${keyword}`
  })
  console.log("data.currentUser", data.currentUser)
  currentUser = data.currentUser
  // socket.emit("online",currentUser[0]._id,"6524ef61a3f3b15d71c601f2")

  return data.users
}

const Search = async () => {

  const users = await fetchUsers()
  console.log("currentUser in searchPage", currentUser)
  return (
    <div className='relative h-screen overflow-hidden'>
      <Navbar currentUser={currentUser} flag={false} />
      
      <div className='flex justify-center my-12 mb-6'>
        <Image src={connect} alt='connect' />
      </div>

      <CreateNew currentUser={currentUser} users={users}/>
    </div>
  )
}

export default Search
