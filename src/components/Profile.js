import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ImLocation2 } from 'react-icons/im';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

export default function Profile() {

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (

        <div className='flex flex-col justify-center bg-white rounded-xl mx-5'>

            <div className='w-auto h-auto flex p-2'>

                <Image
                    src='/react.jpg'
                    alt=''
                    className='rounded-xl'
                    width={600}
                    height={300}
                    priority
                />
            </div>

            <div className='flex flex-col justify-center items-center'>

                <div className='flex rounded-xl p-2'>
                    {user?.user_img &&
                        <Image
                            src={`/uploads/users/${user.user_img}`}
                            alt='socialImage'
                            className='rounded-full'
                            width={80}
                            height={80}
                        />
                    }
                </div>

                {user?.name &&
                    <h1 className='text-2xl font-bold text-[gray] p-2'>
                        {user?.name}
                    </h1>
                }

            </div>

            <div className='flex pb-5'>

                <div className='flex-1 flex gap-3 justify-center items-center text-xl'>
                    <FaFacebook className='text-[#3e5496]' />
                    <FaInstagram className='text-[red]' />
                    <FaTwitter className='text-[#3e5496]' />
                    <FaLinkedin className='text-[red]' />
                </div>

                <div className='flex-1 flex gap-2 justify-center items-center text-xl'>
                    <span className=''> <ImLocation2 className='text-[#3e5496]' /> </span>
                    <span className='text-[gray]'>California, USA</span>
                </div>

                <div className='flex-1 flex gap-3 justify-center items-center text-xl'>
                    <AiOutlineMail className='text-[red]' />
                    <BsThreeDots className='text-[#3e5496]' />
                </div>

            </div>
        </div>
    )
}
