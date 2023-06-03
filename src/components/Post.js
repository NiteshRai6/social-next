import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { BiShareAlt } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Post({ post, modify }) {

    const [edit, setEdit] = useState(false);

    const navigate = useRouter();

    const date = (_date) => new Date(_date).toLocaleString('en', {
        year: "numeric",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    const deletePost = async (post_id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/post/${post_id}`);

            navigate.replace(navigate.asPath);

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='mb-5 bg-white' id={`post${post.post_id}`}>
            <div className='flex-1 flex px-5 pt-3 gap-2 items-center'>

                {post.user_img && <img
                    src={`/uploads/users/${post.user_img}`}
                    alt=''
                    className='w-8 h-8 rounded-full mt-2'
                    width=''
                    height=''
                />}

                <div className='flex-1'>
                    <span className='text-[gray] text-lg font-[600]'> {post.name} </span>
                    <br /> <span className='flex text-[gray] leading-[0.5rem]'> {date(post.post_date)} </span>
                </div>

                <div className='relative flex-1 flex justify-end'>
                    <BsThreeDots className='text-[blue]'
                        onClick={() => {
                            setEdit(prev => !prev)
                        }}
                    />

                    {edit ?
                        <div className='absolute top-5 bg-white text-[gray] z-20 drop-shadow-2xl'>
                            <ul className='p-2 flex flex-col items-center gap-1'>
                                <li className='flex items-center gap-5 cursor-pointer'>
                                    <span className='mt-1 font-bold hover:text-[magenta]'
                                        onClick={(e) => modify(() => ({ ...post, shouldEdit: true, post_img: '' }))}
                                    >
                                        Edit
                                    </span>
                                    <span className='text-xl text-[blue] mt-1'><AiFillEdit /></span>
                                </li>

                                <li className='flex items-center gap-1 font-bold hover:text-[magenta] cursor-pointer'>
                                    <span className='font-bold hover:text-[magenta]'
                                        onClick={(e) => deletePost(post.post_id)}
                                    >Delete
                                    </span>
                                    <span className='text-xl text-[red]'><MdOutlineDeleteForever /></span>
                                </li>
                            </ul>
                        </div>
                        :
                        ''
                    }
                </div>

            </div>

            <div className='flex flex-col px-5 pb-3 select-none'>

                <div className='max-h-20 overflow-auto hide-scrollbar'>
                    <p className='text-[gray] font-[600] mt-3'>
                        {post.post_des}
                    </p>
                </div>

                <div className='w-auto h-auto mt-2 rounded-lg'>
                    {
                        post.post_img && <Image
                            src={`/uploads/posts/${post.post_img}`}
                            alt=''
                            width={900}
                            height={300}
                            priority
                        />
                    }
                </div>

                <div className='flex gap-5 items-center mt-3'>

                    <div className='flex gap-2'>
                        <span>  <AiOutlineLike className='text-2xl text-[blue]' /> </span>
                        <span className='text-[gray] font-[600]'>27 Likes</span>
                    </div>

                    <div className='flex gap-2'>
                        <span>  <BiCommentDetail className='text-2xl text-[red]' /> </span>
                        <span className='text-[gray] font-[600]'>14 Comments</span>
                    </div>

                    <div className='flex gap-2'>
                        <span>  <BiShareAlt className='text-2xl text-[blue]' /> </span>
                        <span className='text-[gray] font-[600]'>Share</span>
                    </div>

                </div>

            </div>
        </div>
    )
}
