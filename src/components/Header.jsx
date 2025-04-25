import React from 'react';
import {
  Bell,
  ChevronDown,
} from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white px-6 py-4 shadow-sm">
      {/* 🔝 Single row with everything aligned */}
      <div className="h-[1px] bg-black w-full" />
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* LEFT: Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <span className="text-gray-400">Home/</span>
          <span className="font-bold text-blue-950 ">Dashboard V2</span>
        </div>
        <div className="flex items-center gap-3">
    <input
      type="text"
      placeholder="Search anything..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="px-4 py-1 rounded-md border border-gray-300 text-sm w-[400px] focus:outline-none"
    />
</div>

    
        {/* RIGHT: Search + Notification + Dropdown */}
        <div className="flex items-center gap-10">
          
          {/* Dropdown */}
          <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 text-sm font-medium">
        
            <ChevronDown size={16} />
          </button>
          {/* Notification Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Bell size={20} />
             </button>
            </div>
      </div>
    </div>
  );
};

export default Header;
