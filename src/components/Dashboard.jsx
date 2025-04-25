import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from './Category';
import AddWidgetModal from './AddWidgetForm';
import Header from './Header';
import { MoreVertical } from 'lucide-react';

const Dashboard = ({searchTerm}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widget.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('cspm');

  const widgetLibrary = {
    cspm: [
      {
        id: 'cloud-accounts',
        name: 'Cloud Accounts',
        type: 'pie',
        data: [
          { name: 'Connected', value: 2 },
          { name: 'Not Connected', value: 2 }
        ]
      },
      {
        id: 'cloud-risk',
        name: 'Cloud Account Risk Assessment',
        type: 'pie',
        data: [
          { name: 'Passed', value: 7253 },
          { name: 'Failed', value: 1689 },
          { name: 'Warning', value: 681 },
          { name: 'Not Available', value: 36 }
        ]
      }
    ],
    cwpp: [
      {
        id: 'alerts',
        name: 'Top Alerts',
        type: 'bar',
        data: [
          { name: 'Critical', value: 40 },
          { name: 'High', value: 60 },
          { name: 'Medium', value: 30 }
        ]
      }
    ],
    registry: [
      {
        id: 'image-risk',
        name: 'Image Risk Assessment',
        type: 'bar',
        data: [
          { name: 'Critical', value: 9 },
          { name: 'High', value: 150 },
          { name: 'Medium', value: 120 },
          { name: 'Low', value: 200 }
        ]
      },
      {
        id: 'image-issues',
        name: 'Image Security Issues',
        type: 'bar',
        data: [
          { name: 'Critical', value: 2 },
          { name: 'High', value: 3 },
          { name: 'Medium', value: 5 },
          { name: 'Low', value: 4 }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedCategory('cspm');
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-500 text-sm rounded-md border hover:bg-gray-100"
            >
              Add Widget +
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-md" title="Refresh">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M3 9a9 9 0 0115.89-5.328M21 15a9 9 0 01-15.89 5.328" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md" title="Options">
              <MoreVertical size={18} className="text-gray-600" />
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-white text-blue-950 font-bold rounded-md border border-gray-300 hover:shadow-sm transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last 2 Days
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const filteredWidgets = category.widgets.filter(widget =>
              widget.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredWidgets.length === 0) return null;

            return (
              <Category
                key={category.id}
                category={{ ...category, widgets: filteredWidgets }}
                onOpenModal={(id) => {
                  setSelectedCategory(id);
                  setIsModalOpen(true);
                }}
              />
            );
          })}
        </div>
      </div>

       {/* Modal */}
       {isModalOpen && (
        <AddWidgetModal
          categories={categories}
          widgetLibrary={widgetLibrary}
          defaultCategory={selectedCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};


export default Dashboard;
