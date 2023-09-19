"use client"

import React, { useState, useEffect, useRef } from 'react';
import arrow from '../../Assets/leftArrow.svg';
import menu from '../../Assets/menu1.svg';
import Link from 'next/link';
import Image from 'next/image';
import ChatBody from '@/app/Components/ChatBody';

const Page = () => {
  const [showSetting, setShowSetting] = useState(false);
  const settingsRef = useRef(null);

  // Close the settings menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSetting(false);
      }
    }

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative h-screen w-full'>
      <nav className='bg-primary pt-5 pb-24 px-2 sticky top-0'>
        <div className="flex items-center justify-between">
          <Link href={'/home'} className='text-2xl text-gray-300'>
            <Image src={arrow} alt='arrow' />
          </Link>
          <h1 className='text-xl justify-self-center text-gray-300'>Yash Jawale</h1>
          <Image
            src={menu}
            alt='menu'
            className='group'
            onClick={() => setShowSetting(!showSetting)}
          />
        </div>

        <div className='text-center text-gray-300 flex items-center justify-center gap-1 mt-3'>
          <p className={`w-3 h-3 mt-[1px] bg-green-600 rounded-full`}></p>
          <p>online</p>
        </div>
      </nav>

      <ul
        ref={settingsRef}
        className={`flex flex-col gap-2 absolute rounded-xl ${
          showSetting ? 'max-h-auto p-6' : 'max-h-0 p-0'
        } top-12 overflow-hidden transition-all right-6 z-20 bg-slate-200`}
      >
        <li className='py-2 px-3'>Setting1</li>
        <li className='py-2 px-3'>Setting2</li>
        <li className='py-2 px-3'>Setting3</li>
        <li className='py-2 px-3'>Setting4</li>
      </ul>

      <ChatBody />
    </div>
  );
};

export default Page;
