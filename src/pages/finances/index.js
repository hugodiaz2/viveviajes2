import Image from 'next/image';
import React, { useState } from 'react';

export default function Dashboard() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Finance</h1>
      <p>Finance</p>
      <section className="py-20 w-full">
        <div className="grid grid-cols-2 gap-8 w-full px-4">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col p-6 bg-[#F5F5F5] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image src="/income.png" alt="Users Logo" width={24} height={24} />
                <h2 className="text-lg font-semibold ml-2 text-black font-montserrat">Total income</h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500 mt-1 ml-8">New premium subscriptions</span>
                </div>
                <div className="flex items-center">
                  <Image src="/arrow-left.png" alt="Dropdown Icon" width={20} height={20} onClick={toggleSubMenu} className="mr-20" />
                  <span className="text-gray-500 mt-1 ml-10 mr-20">$1,688</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mt-1 ml-8">Tokens</span>
                </div>
                <div className="flex items-center">
                  <Image src="/arrow-left.png" alt="Dropdown Icon" width={20} height={20} onClick={toggleSubMenu} className="mr-20" />
                  <span className="text-gray-500 mt-1 ml-10 mr-20">$3,798</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mt-1 ml-8">Purchased advertisements</span>
                </div>
                <div className="flex items-center">
                  <Image src="/arrow-left.png" alt="Dropdown Icon" width={20} height={20} onClick={toggleSubMenu} className="mr-20" />
                  <span className="text-gray-500 mt-1 ml-14 mr-20">$963</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mt-1 ml-8">Store</span>
                </div>
                <div className="flex items-center">
                  <Image src="/arrow-left.png" alt="Dropdown Icon" width={20} height={20} onClick={toggleSubMenu} className="mr-20" />
                  <span className="text-gray-500 mt-1 ml-10 mr-20">$2,864</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mt-1 ml-8">Refunds</span>
                </div>
                <div className="flex items-center">
                  <Image src="/arrow-left.png" alt="Dropdown Icon" width={20} height={20} onClick={toggleSubMenu} className="mr-20" />
                  <span className="text-gray-500 mt-1 ml-10 mr-20">$-1,771</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mt-1 ml-8">Fees</span>
                </div>
                <div className="flex items-center">
                  <Image src="/arrow-left.png" alt="Dropdown Icon" width={20} height={20} onClick={toggleSubMenu} className="mr-20" />
                  <span className="text-gray-500 mt-1 ml-10 mr-20">$1,000</span>
                </div>
              </div>
              {showSubMenu && (
                <div className="mt-4">
                  <p>Submenu item 1</p>
                  <p>Submenu item 2</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col p-6 bg-[#F5F5F5] rounded-lg shadow-md" style={{ height: '600px' }}>
              <div className="flex items-center mb-4">
                <Image src="/AI 1.png" alt="Feedback Logo" width={24} height={24} />
                <h2 className="text-lg font-semibold ml-2 text-black font-montserrat">AI Calls</h2>
              </div>
              <p className="text-4xl font-bold text-black font-montserrat mt-6">12:30 hrs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return page;
}