import React from 'react';
import ChatBody from '@/app/Components/ChatBody';
import Profile from '@/app/Components/Profile';
import LastSeen from '@/app/Components/LastSeen';
import axios from 'axios'
import { cookies } from 'next/headers'
import ChatNav from '@/app/Components/ChatNav';
import NotLoggedIn from '../Components/NotLoggedIn';

let currentUser
let jwt;

const fetchMessages = async (chatId,token) => {
  console.log("Fetching message in server component")
  const cookieStore = cookies()
  currentUser = cookieStore.get('currentUser')
  jwt = token?.value
  console.log("chatId", chatId)
  let { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/allMessages/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token?.value}`
    }
  })
  currentUser = data?.currentUser?.[0]._id
  return data
}

const Chat = async ({ searchParams }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')
  if(!token) return <NotLoggedIn />
  console.log(searchParams)
  const chatBody = await fetchMessages(searchParams.chatId,token)
  console.log("------------Messages------------")
  console.log(chatBody.messages.length, "messages fetched")
  console.dir(chatBody)

  console.log(searchParams.isGroupChat)
  const groupUsers = JSON.parse(searchParams.users)

  return (
    <div className='h-screen w-full'>

      <ChatNav sender={ searchParams.sender.split("%20").join(" ") } userImage={searchParams.userImage}/>
      <ChatBody chatId={searchParams.chatId} chatBody={chatBody} currentUser={currentUser} jwt={jwt} />

      <Profile jwt={jwt} chatTitle={searchParams.sender.split("%20").join(" ")} image={searchParams.userImage} isGroupChat={searchParams.isGroupChat} admin={searchParams.admin.split("%20").join(" ")} groupUsers={groupUsers}/>
      {/* <Profile show={showProfile} setShowProfile={setShowProfile} settingsRef={settingsRef}/> */}

    </div>
  );
};

export default Chat;


// const [showSetting, setShowSetting] = useState(false);
// const [showProfile, setShowProfile] = useState(false);
// const settingsRef = useRef(null);

// Close the settings menu when clicking outside of it
// useEffect(() => {

//   function handleClickOutside(event) {
//     if (settingsRef.current && !settingsRef.current.contains(event.target)) {
//       setShowSetting(false);
//     }
//   }

//   // Add event listener when the component mounts
//   document.addEventListener('mousedown', handleClickOutside);

//   // Remove event listener when the component unmounts
//   return () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   };
// }, []);