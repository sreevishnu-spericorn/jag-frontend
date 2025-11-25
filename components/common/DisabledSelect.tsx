import React from 'react'

const DisabledSelect = ({ label, disabled, children, ...props }: any) => (
    <div className="flex flex-col">
       <label className="text-gray-500 text-sm font-normal mb-1">{label}</label>
       <select
          disabled
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
          {...props}
       >
          {children}
       </select>
    </div>
 );
 

export default DisabledSelect