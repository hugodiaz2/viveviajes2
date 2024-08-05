import Image from 'next/image';
import Sidebar from './sidebar';
import React, { useState, useEffect } from 'react';

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

const Layout = ({ children }) => {

  const { isMobile, isDesktop } = useDeviceType();

  const [openSlider, setOpenSlider] = useState(false);

  return (
    <>
      {isDesktop && (
        <div className="h-screen flex flex-col bg-black">
          <div className="bg-black text-white flex justify-between items-center border-b-[1px] border-white pt-2 pb-2 pl-4 pr-4">
            <div className="flex items-center">
              <Image src="/viveviajes1.png" alt="Logo" width={90} height={32} />
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <Sidebar className="w-64 fixed top-0 left-0 h-full" />
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="h-screen flex flex-col bg-black">
          <div className="relative bg-black text-white flex justify-center items-center pt-4 pb-4 pl-4 pr-4">
            <button className="absolute left-4 bg-[#FF6737] rounded-[4px] p-1" onClick={() => setOpenSlider(!openSlider)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <Image src="/GPlay2.png" alt="Logo" width={90} height={32} />
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <Sidebar className="w-64 fixed top-0 left-0 h-full" openMobile={openSlider} setOpenSlider={setOpenSlider}/>
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div> 
        </div>
      )}
    </>
  );
};

export default Layout;