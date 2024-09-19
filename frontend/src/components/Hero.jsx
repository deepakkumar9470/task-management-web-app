import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

const Hero = () => {
    const {userInfo} = useSelector((state)=>state.auth);

    return (
        <section className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?task,workspace')` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                    Task <span className="text-green-400">Management</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">
                    Manage tasks with full CRUD functionality, filter your tasks, and ensure secure authentication.
                </p>


                <div className="mt-8 space-x-4">
                    {  !userInfo &&
                        <>
                           <Link to="/login" className="inline-block py-3 px-6 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
                        Get Started
                    </Link>
                    <Link to="/register" className="inline-block py-3 px-6 bg-transparent border border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out">
                        Sign Up
                    </Link>
                        </>
                    }

                    {
                        userInfo && 
                         <span className="text-2xl font-bold text-green-400">Welcome {userInfo?.name ? userInfo?.name : ''} 🤵</span>
                    }
                </div>
            </div>
        </section>
    );
};

export default Hero;
