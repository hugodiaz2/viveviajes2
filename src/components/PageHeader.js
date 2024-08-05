import React from 'react';

const PageHeader = ({ title }) => {

  return (
    <div className="bg-[#F5F5F5] p-8 rounded-[10px] mb-2 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold text-black text-center w-full">
        {title}
      </h1>
    </div>
  );
};

export default PageHeader;
