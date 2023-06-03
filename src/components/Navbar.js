import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai';
import { MdDarkMode } from 'react-icons/md';
import { AiOutlineQrcode } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillMail } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const navigate = useRouter();

    const logout = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/logout`);
            localStorage.clear();
            navigate.reload('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='hidden lg:flex h-16  bg-[#3b5998] text-white font-[500] items- sticky top-0 z-50'>

            <div className='flex-1 flex justify-center items-center gap-5'>
                <h1 className='text-2xl'>Social-App</h1>

                <Link href='/'>
                    <AiFillHome className='text-2xl hover:text-[magenta] transform 
    hover:rotate-[360deg] transition duration-700 ease-in-out' />
                </Link>

                <MdDarkMode className='text-2xl hover:text-[magenta] transform 
    hover:rotate-[360deg] transition duration-700 ease-in-out' />

                <AiOutlineQrcode className='text-2xl hover:text-[magenta] transform 
    hover:rotate-[360deg] transition duration-700 ease-in-out' />

                <div className='flex items-center bg-white text-[gray] rounded-full'>
                    <AiOutlineSearch className='text-xl ml-1' />
                    <input className='p-1 outline-none rounded-full' type='text' placeholder='Search' />
                </div>

            </div>

            <div className='flex-1 flex justify-center items-center gap-5'>

                <BsFillPersonFill className='text-2xl hover:text-[magenta] transform 
    hover:rotate-[360deg] transition duration-700 ease-in-out' />

                <AiFillMail className='text-2xl hover:text-[magenta] transform 
    hover:rotate-[360deg] transition duration-700 ease-in-out' />

                <IoIosNotifications className='text-2xl hover:text-[magenta] transform 
    hover:rotate-[360deg] transition duration-700 ease-in-out' />

                <div className='flex items-center gap-2'>
                    {user?.user_img &&
                        <Image
                            className='w-8 h-8 rounded-full'
                            src={`/uploads/users/${user?.user_img}`}
                            width='32'
                            height='32'
                            alt='socialImage'
                        />
                    }

                    <span className='ml-1'>{user?.name}</span>
                </div>

                {
                    user ?
                        <span className='cursor-pointer hover:text-[magenta]'
                            onClick={logout}
                        >Logout</span>
                        : ''
                }

            </div>

        </div>
    )
}
