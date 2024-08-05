import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOutAdmin, getAdminType } from '../utils/firebase';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1224);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isDesktop: !isMobile };
};

const Sidebar = ({ openMobile, setOpenSlider }) => {
  const router = useRouter();
  const { isMobile, isDesktop } = useDeviceType();
  const isActive = (path) => router.pathname === path;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [adminType, setAdminType] = useState('');

  useEffect(() => {
    const fetchAdminType = async () => {
      const type = await getAdminType();
      setAdminType(type);
    };
    fetchAdminType();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const signOut = async () => {
    try {
      await signOutAdmin();
      sessionStorage.clear();
      localStorage.clear();
      router.push('/');
    } catch (error) {
      toast.error(error.code, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      {isDesktop && (
        <div className={`bg-black text-white ${isCollapsed ? 'w-14' : 'w-78'} h-[calc(100vh-50px)] flex flex-col rounded-br-[10px] transition-width duration-700 ease-in-out border-r-[1px] border-white relative`}>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <ul>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/dashboard')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/dashboard') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/dashboard.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/dashboard') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/dashboard_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/dashboard') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Home</span>}
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/admins')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/admins') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/admins.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/admins') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/super_Admin_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/admins') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Admins</span>}
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/users')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/users') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/user-solid.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/users') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/user_solid_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/users') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Acerca De</span>}
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/rewards')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/rewards') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/Rewards.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/rewards') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/rewards_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/rewards') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Actividades</span>}
                </button>
              </li>
              <li className="mb-1">
                <button onClick={() => setIsSupportOpen(!isSupportOpen)} className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/support') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                  <Image
                    src="/support.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} group-hover:hidden`}
                  />
                  <Image
                    src="/support_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} hidden group-hover:block`}
                  />
                  {!isCollapsed && <span className='text-xs'>Destinos</span>}
                  {!isCollapsed && <Image src="/DownArrow.png" alt="Expand" width={15} height={15} className="ml-auto" />}
                </button>
                {!isCollapsed && isSupportOpen && (
                  <ul className="mt-2">
                    {adminType === 'Super Admin' && (
                      <li className="mb-2">
                        <Link href="/support/faq" className={`flex items-center font-bold text-lg h-8 pl-12 transition-colors duration-300 ${isActive('/support/faq') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                          <span className='text-xs'>Ofertas</span>
                        </Link>
                      </li>
                    )}
                    {adminType === 'Admin' && (
                      <li className="mb-2">
                        <Link href="/support/userQueries" className={`flex items-center font-bold text-lg h-8 pl-12 transition-colors duration-300 ${isActive('/support/user-queries') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                          <span className='text-xs'>Lugares</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/fees')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/fees') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/fees_white.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/fees') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/fee_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/fees') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Reservar</span>}
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button className="w-full font-bold h-8 bg-[#FF6737] rounded-br-[10px] text-white flex items-center justify-between px-4" onClick={() => signOut()}>
              {!isCollapsed && <span className='text-xs'>Log out</span>}
              <Image src="/log-out.png" alt="Log out" width={14} height={14} />
            </button>
          </div>
          <button
            onClick={toggleSidebar}
            className="bg-[#FF6737] p-1 rounded-full w-6 h-6 absolute top-4 -right-px transform translate-x-1/2 flex items-center justify-center"
          >
            <div
              className={`flex items-center justify-center w-full h-full transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              style={{ marginLeft: isCollapsed ? '3px' : '-3px' }}
            >
              <Image src="/BackArrow.png" alt="Collapse" width={8} height={8} />
            </div>
          </button>
        </div>
      )}
      {isMobile && (
        <div className={`${openMobile ? 'bloc' : 'hidden'} fixed top-0 bg-black text-white w-80 h-[100vh] flex flex-col rounded-br-[10px] transition-width duration-700 ease-in-out border-r-[1px] border-white z-10`}>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className='p-4 flex flex-col '>
              <span className='text-md'>Ariana Smith</span>
              <span className='text-xs pt-1'>Super Admin</span>
            </div>
            <ul>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/dashboard')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/dashboard') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/dashboard.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/dashboard') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/dashboard_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/dashboard') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Home</span>}
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/admins')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/admins') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/admins.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/admins') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/super_Admin_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/admins') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Admins</span>}
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/users')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/users') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/user-solid.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/users') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/user_solid_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/users') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Acerca De</span>}
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => router.push('/events')}
                  className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/events') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}
                >
                  <Image
                    src="/My-events.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/events') ? 'hidden' : 'block group-hover:hidden'}`}
                  />
                  <Image
                    src="/my_events_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} ${isActive('/events') ? 'block' : 'hidden group-hover:block'}`}
                  />
                  {!isCollapsed && <span className='text-xs'>Actividades</span>}
                </button>
              </li>
              <li className="mb-1">
                <button onClick={() => setIsSupportOpen(!isSupportOpen)} className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/support') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                  <Image
                    src="/support.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} group-hover:hidden`}
                  />
                  <Image
                    src="/support_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} hidden group-hover:block`}
                  />
                  {!isCollapsed && <span className='text-xs'>Destinos</span>}
                  {!isCollapsed && <Image src="/DownArrow.png" alt="Expand" width={15} height={15} className="ml-auto" />}
                </button>
                {!isCollapsed && isSupportOpen && (
                  <ul className="mt-2">
                    {adminType === 'Super Admin' && (
                      <li className="mb-2">
                        <Link href="/support/faq" className={`flex items-center font-bold text-lg h-8 pl-12 transition-colors duration-300 ${isActive('/support/faq') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                          <span className='text-xs'>Ofertas</span>
                        </Link>
                      </li>
                    )}
                    {adminType === 'Admin' && (
                      <li className="mb-2">
                        <Link href="/support/userQueries" className={`flex items-center font-bold text-lg h-8 pl-12 transition-colors duration-300 ${isActive('/support/user-queries') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                          <span className='text-xs'>Lugares</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
              <li className="mb-1">
                <button onClick={() => router.push('/reports')} className={`group flex items-center w-full font-bold text-lg h-8 px-4 transition-colors duration-300 ${isActive('/reports') ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black hover:font-bold'}`}>
                  <Image
                    src="/reports.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} group-hover:hidden`}
                  />
                  <Image
                    src="/reports_black.png"
                    alt="Finances"
                    width={14}
                    height={14}
                    className={`${isCollapsed ? '' : 'mr-4'} hidden group-hover:block`}
                  />
                  {!isCollapsed && <span className='text-xs'>Reservar</span>}
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button className="w-full font-bold h-8 bg-[#FF6737] rounded-br-[10px] text-white flex items-center justify-between px-4" onClick={() => signOut()}>
              {!isCollapsed && <span className='text-xs'>Log out</span>}
              <Image src="/log-out.png" alt="Log out" width={14} height={14} />
            </button>
          </div>
          <button
            onClick={() => setOpenSlider(false)}
            className="bg-[#FF6737] p-1 rounded-full w-6 h-6 absolute top-4 -right-px transform translate-x-1/2 flex items-center justify-center"
          >
            <div
              className={`flex items-center justify-center w-full h-full transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              style={{ marginLeft: isCollapsed ? '3px' : '-3px' }}
            >
              <Image src="/BackArrow.png" alt="Collapse" width={8} height={8} />
            </div>
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Sidebar;
