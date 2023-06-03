import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { CgWebsite } from 'react-icons/cg';
import { BsYoutube } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { MdEventNote } from 'react-icons/md';
import { SiYoutubegaming } from 'react-icons/si';
import { BiPhotoAlbum } from 'react-icons/bi';
import { MdVideoSettings } from 'react-icons/md';
import { AiFillMail } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { ImLocation } from 'react-icons/im';
import { FaReact } from 'react-icons/fa';
import { MdDevicesOther } from 'react-icons/md';

import Link from 'next/link';

export default function Leftbar({ setModal }) {

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, []);

    return (
        <div className='sticky top-16'>
            <div className='hidden lg:flex flex-col gap-2 xl:px-[2rem] sm:px-2 pt-2 pb-3 bg-white'>

                <div className='flex gap-2 items-center'>
                    <span>
                        {user?.user_img &&
                            <Image
                                src={`/uploads/users/${user?.user_img}`}
                                className='w-5 h-5 rounded-full'
                                width='20'
                                height='20'
                                alt='socialImage'
                            />
                        }
                    </span>

                    {user?.name &&
                        <span className='text-[gray] font-[600] hover:text-[magenta]'>
                            {user?.name}
                        </span>
                    }
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <FaUserFriends />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Friends</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <HiUserGroup />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Groups</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <CgWebsite />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Marketplace</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <BsYoutube />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Watch</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <AiFillClockCircle />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Memories</span>
                </div>

                <hr className='mt-2' />
                <p className='text-[gray] font-[700]'>Your shortcuts</p>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <MdEventNote />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Events</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <SiYoutubegaming />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Gaming</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <BiPhotoAlbum />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Gallery</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <MdVideoSettings />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Videos</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <AiFillMail />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Messages</span>
                </div>

                <hr className='mt-2' />
                <p className='text-[gray] font-[700]'>User</p>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <CgProfile />
                    </span>

                    <span
                        onClick={() => {
                            setModal(prev => !prev)
                        }}
                        className='text-[gray] font-[600] hover:text-[magenta] cursor-pointer'>Profile</span>

                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <ImLocation />
                    </span>

                    <Link href='/register'>
                        <span className='text-[gray] font-[600] hover:text-[magenta]'>Locations</span>
                    </Link>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[red]'>
                        <FaReact />
                    </span>

                    <Link href='/login'>
                        <span className='text-[gray] font-[600] hover:text-[magenta]'>Courses</span>
                    </Link>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-xl text-[blue]'>
                        <MdDevicesOther />
                    </span>

                    <span className='text-[gray] font-[600] hover:text-[magenta]'>Others</span>
                </div>

            </div>
        </div>
    )
}
