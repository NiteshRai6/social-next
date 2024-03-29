import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {

    const [error, setError] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        user_img: ''
    });

    const navigate = useRouter();

    const handleChange = (e) => {
        e.preventDefault();

        const inputValue = e.target.type === "file"
            ? e.target.files[0]
            : e.target.value;

        setUserInfo(prev => {
            return { ...prev, [e.target.name]: inputValue }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', userInfo.name);
            formData.append('email', userInfo.email);
            formData.append('mobile', userInfo.mobile);
            formData.append('password', userInfo.password);
            formData.append('user_img', userInfo.user_img);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/register`,
                formData, { withCredentials: true });

            navigate.push('/');
            // console.log(res.data);
            return res.data;

        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    return (

        <div className='flex justify-center items-center bg-[teal] h-[100vh]'>

            <div className='flex flex-col lg:flex-row bg-white h-[70vh]'>

                <div className='flex-1 flex justify-center items-center flex-col gap-5 py-5'>

                    <h1 className='text-3xl text-[gray] font-bold'>Register</h1>

                    {error && <h2 className='text-[#720f0f] text-lg font-bold'>{error}</h2>}

                    <form className='flex justify-center items-center flex-col gap-5'>
                        <input className='outline-none border-b p-1' type='text' name='name' placeholder='Name' onChange={handleChange} />

                        <input className='outline-none border-b p-1' type='email' name='email' placeholder='Email' onChange={handleChange} />

                        <input className='outline-none border-b p-1' type='number' name='mobile' placeholder='Mobile' onChange={handleChange} />

                        <input className='outline-none border-b p-1' type='password' name='password' placeholder='Password' onChange={handleChange} />

                        <div className=' my-3 lg:ml-20'>
                            <input className='' type='file' name='user_img' onChange={handleChange} />
                        </div>

                        <button className='bg-[#3cb371] text-white font-[500] p-1 ' onClick={handleSubmit}>Register</button>
                    </form>
                </div>

                <div className="hidden lg:flex-1 lg:flex flex-col justify-center items-center gap-5 bg-[url('/art1.jpg')] bg-cover bg-center">

                    <h1 className='text-3xl font-bold'>Social Media</h1>

                    <p className='px-5 text-center text-[white] font-bold'>This Social-App developed using React.js, Node.js & Next.js</p>

                    <p className='text-white font-bold p-2 text-center'>Do You have an Account ?
                        <Link href='/'>
                            <span className='pl-2 hover:text-[yellow] hover:font-bold'>Login</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
