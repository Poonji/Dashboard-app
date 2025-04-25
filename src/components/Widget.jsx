import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/WidgetSlice';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#FF4444', '#8884d8'];

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition min-h-[200px]">
      {/* Title & Remove Button */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{widget.name}</h3>
        <button
          onClick={handleRemove}
          className="text-red-500 text-lg font-bold hover:text-red-700"
        >
          ×
        </button>
      </div>

      {/* PIE Chart */}
      {widget.type === 'pie' && widget.data && (
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={widget.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {widget.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}

      {/* VERTICAL BAR Chart */}
      {widget.type === 'bar' && widget.data && (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* HORIZONTAL BAR / PROGRESS STYLE CHART */}
      {widget.type === 'hbar' && widget.data && (
  <>
    <ResponsiveContainer width="100%" height={20}>
      <BarChart
        data={[widget.data.reduce((acc, d) => ({ ...acc, [d.name]: d.value }), {})]}
        layout="vertical"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="label" hide />
        <Tooltip />
        {widget.data.map((d, i) => (
          <Bar
            key={i}
            dataKey={d.name}
            stackId="a"
            fill={COLORS[i % COLORS.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>

    {/* 🔹 Custom Legend Below HBar */}
    <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
      {widget.data.map((d, i) => (
        <div key={i} className="flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[i % COLORS.length] }}
          />
          {d.name}
        </div>
      ))}
    </div>
  </>
)}


      {/* TEXT fallback */}
      {!widget.type && (
        <p className="text-sm text-gray-700 whitespace-pre-line">{widget.text}</p>
      )}
    </div>
  );
};

export default Widget;
