import React, { useState } from 'react';
import Widget from './Widget';

const Category = ({ category, onOpenModal }) => {
  return (
    <div className="bg-[#f1f5f9] rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-black">
          {category.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
          />
        ))}

        {/* ⬅️ Placeholder Add Widget Card */}
        {category.widgets.length < 3 &&
  Array.from({ length: 3 - category.widgets.length }).map((_, i) => (
    <div
      key={`placeholder-${i}`}
      className="min-h-[180px] bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm"
    >
      <button
        onClick={() => onOpenModal(category.id)}  // 👈 only the button triggers
        className="px-4 py-2 border text-sm text-gray-600 rounded-md hover:bg-gray-50"
      >
        + Add Widget
      </button>
    </div>
  ))}
  {category.widgets.length === 0 ? (
  <p className="text-sm text-gray-400">No matching widgets</p>
) : (
  <div className="grid ...">{/* widget cards */}</div>
)}


      </div>
    </div>
  );
};


export default Category;
