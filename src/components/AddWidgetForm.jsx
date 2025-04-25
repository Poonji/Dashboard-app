import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../store/WidgetSlice';


const AddWidgetModal = ({ categories, widgetLibrary, onClose }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('cspm');
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = (categoryId, widget) => {
    const key = `${categoryId}-${widget.id}`;
    setSelectedWidgets((prev) => ({
      ...prev,
      [key]: prev[key] ? null : widget,
    }));
  };

  const handleConfirm = () => {
    Object.entries(selectedWidgets).forEach(([key, widget]) => {
      if (widget) {
        const [categoryId] = key.split('-');
        dispatch(addWidget({ categoryId, widget }));
      }
    });
    onClose();
  };

  const filteredWidgets = widgetLibrary[activeTab]?.filter((widget) =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 pt-20">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Add Widget</h3>
          <button onClick={onClose} className="text-white text-xl">×</button>
        </div>

        {/* Tabs */}
        <div className="border-b flex space-x-4 px-6 pt-4">
          {Object.keys(widgetLibrary).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search widgets..."
            className="w-full border rounded px-3 py-2 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Widget List */}
          <div className="space-y-2">
            {filteredWidgets?.map((widget) => {
              const categoryId = activeTab;
              const key = `${categoryId}-${widget.id}`;
              const isChecked = !!selectedWidgets[key];
              return (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(categoryId, widget)}
                  />
                  <span>{widget.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end space-x-3 border-t">
          <button onClick={onClose} className="border border-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleConfirm} className="bg-blue-900 text-white px-4 py-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
