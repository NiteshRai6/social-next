import React, { useState, useEffect } from 'react';
import { FaImages } from 'react-icons/fa';
import { AiFillTag } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import Post from './Post';

export default function Posts({ postData }) {

    // console.log(postData);

    const navigate = useRouter();

    const [post, setPost] = useState({
        post_des: '',
        post_img: "",
        post_date: "",
        user_id: '',
        user_img: ''
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setPost((pre) => {
            return { ...pre, user_id: user?.user_id, user_img: user?.user_img }
        })
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.type === "file"
            ? e.target.files[0]
            : e.target.value;

        setPost(prev => {
            return { ...prev, [e.target.name]: inputValue }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('post_des', post.post_des);
            formData.append('post_img', post.post_img);
            formData.append('post_date', moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
            formData.append('user_id', post.user_id);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/post`,
                formData, { withCredentials: true });

            navigate.replace(navigate.asPath);

            console.log('Post Successful.');
            setPost(prev => ({ ...prev, post_des: '', post_img: '' }))
            return res.data;

        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('post_des', post.post_des);
            formData.append('post_img', post.post_img);
            formData.append('post_date', post.post_date);
            formData.append('user_id', post.user_id);

            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/post/${post.post_id}`,
                formData, { withCredentials: true });

            navigate.replace(navigate.asPath);

            console.log('Update Successful.');

            // console.log(res.data);
            setPost(() => ({ post_des: '', post_img: '', shouldEdit: false }))

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='mx-5'>

            {/* Write Post  */}
            <div className='flex flex-col bg-white mb-5'>

                <div className='flex rounded-xl p-3'>

                    {post.user_img && <img
                        src={`/uploads/users/${post.user_img}`}
                        alt=''
                        className='w-8 h-8 rounded-full mt-1'
                        width=''
                        height=''
                    />}

                    <textarea
                        className='p-2 outline-none'
                        rows="3"
                        cols="75"
                        placeholder="What's on your mind!"
                        name='post_des'
                        value={post.post_des || ''}
                        onChange={handleChange}
                    >
                    </textarea>
                </div>

                <hr className='mt-2' />

                <div className='flex items-center justify-evenly p-2'>

                    <div>
                        <input type='file' name='post_img' id='fileUpload' onChange={handleChange} className='hidden' />
                        <label htmlFor='fileUpload'>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <span> <FaImages className='text-[blue]' /> </span>
                                <span className='text-[gray]'>Add Image</span>
                            </div>
                        </label>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span> <ImLocation2 className='text-[red]' /> </span>
                        <span className='text-[gray]'>Add Place</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span> <AiFillTag className='text-[blue]' /> </span>
                        <span className='text-[gray]'>Tag Friends</span>
                    </div>

                    <div className='flex items-center'>
                        <button
                            onClick={post?.shouldEdit ? handleUpdate : handleSubmit} className='bg-[#3cb371] text-white w-16'
                        >
                            {post?.shouldEdit ? 'Update' : 'Post'}
                        </button>
                    </div>

                </div>
            </div>

            {/* Read Post */}
            {postData.map((_post) => (
                <Post post={_post} modify={setPost} key={_post.post_id} />
            ))}

        </div>
    )
}
