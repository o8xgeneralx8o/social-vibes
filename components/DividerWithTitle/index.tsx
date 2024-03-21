

import React from 'react'

const DividerWithTitle = ({ title }: Readonly<{
  title: string;
}>) => {
  return (
    <div className=" flex items-center w-full">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-slate-600">{title}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  )
}

export default DividerWithTitle