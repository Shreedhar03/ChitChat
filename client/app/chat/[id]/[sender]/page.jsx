import React from 'react';
import arrow from '../../../Assets/leftArrow.svg';
import menu from '../../../Assets/menu1.svg';
import Link from 'next/link';
import Image from 'next/image';
import ChatBody from '@/app/Components/ChatBody';
import Profile from '@/app/Components/Profile';

const Chat = ({params}) => {
  console.log("params",params)
  console.log(params.sender)

  return (
    <div className='relative h-screen w-full'>
      <nav className='bg-primary pt-5 pb-24 px-2 sticky top-0'>
        <div className="flex items-center justify-between">
          <Link href={'/home'} className='text-2xl text-gray-300'>
            <Image src={arrow} alt='arrow' />
          </Link>
          <h1 className='text-xl justify-self-center text-gray-300'>{params.sender.split('%20').join(" ")}</h1>
          <Image
            src={menu}
            alt='menu'
            className='group'
            // onClick={() => setShowSetting(!showSetting)}
          />
        </div>

        <div className='text-center text-gray-300 flex items-center justify-center gap-1 mt-3'>
          <p className={`w-3 h-3 mt-[1px] bg-green-600 rounded-full`}></p>
          <p>online</p>
        </div>
      </nav>

      <ul
        // ref={""}
        className={`flex flex-col gap-2 absolute rounded-xl ${false ? 'max-h-auto p-6' : 'max-h-0 p-0'
          } top-12 overflow-hidden transition-all right-6 z-20 bg-slate-200`}
      >
        <li className='py-2 px-3'>Search</li>
        <li className='py-2 px-3'>Media</li>
        <li className='py-2 px-3'>Wallpaper</li>
        <li className='py-2 px-3'>Clear chat</li>
        <li className='py-2 px-3'>View Profile</li>
        {/* <li className='py-2 px-3' onClick={()=>{setShowProfile(true);setShowSetting(false)}}>View Profile</li> */}
      </ul>

      <ChatBody chatId={params.id}/>

      {/* <Profile show={showProfile} setShowProfile={setShowProfile} settingsRef={settingsRef}/> */}
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