import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import ModalContainer from './ModalContainer'; 
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import { useDispatch,useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/usersApiSlice';
import { logout } from '../redux/authSlice';
import toast from 'react-hot-toast';
import {CircleUserRound} from 'lucide-react';
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation()
  const [isOpen, setIsOpen] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [modalContent, setModalContent] = useState(''); 

  const handleOpenModal = (type) => {
    setModalContent(type);
    setShowModal(true);
  };

  const logoutHandler = async () =>{
    try {
      const res = await logoutApiCall().unwrap()
      dispatch(logout())
      toast(res.message)
      navigate('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'An unexpected error occurred.';
    toast.error(errorMessage);
  }
  }

  return (
    <>
      <header className="lg:px-16 px-4 bg-secBg text-gray-300 flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold uppercase text-white">
            <span className="text-2xl font-extrabold uppercase text-green-500">Task</span> Management
          </Link>
        </div>

        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className={`md:flex md:items-center md:w-auto w-full ${isOpen ? 'block' : 'hidden'}`} id="menu">
          <nav className="w-full">
            <ul className="md:flex items-center justify-between text-base text-gray-300 space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
              <li>
                {
                  !userInfo && (
                    <Link
                    to="/login"
                    className="md:p-4 py-2 px-4 rounded-md block text-gray-100 hover:bg-green-600 transition-colors duration-300"
                     >
                    Login
                  </Link>
                  )
                }
              </li>
              <li>
               {
                !userInfo && (
                <Link 
                   className="md:p-4 py-2 px-4 rounded-md block bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transition-all duration-300" 
                   to="/register">
                 SignUp
                </Link>
                )
               }

               {
                userInfo && (
                  <div className='flex items-center gap-4'>
                    <Link className='text-gray-400 font-medium' 
                    to="/tasklists">Tasks</Link>
                    <div className='flex items-center cursor-pointer'>
                    <CircleUserRound className='text-gray-400'/>

                    <p className='text-gray-400 text-xl font-medium'>{(userInfo.name).substring(0,1)}</p>
                    </div>
                    <button 
                    onClick={logoutHandler}
                    className='className="md:p-4 py-2 px-4 rounded-md block bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transition-all duration-300"'>Logout</button>
                  </div>
                )
               }
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Modal Container */}
      <ModalContainer showModal={showModal} setShowModal={setShowModal}>
        {modalContent === 'Login' && (
        <Login/>
        )}
        {modalContent === 'Signup' && (
         <SignUp/>
        )}
      </ModalContainer>
    </>
  );
};

export default Navbar;
