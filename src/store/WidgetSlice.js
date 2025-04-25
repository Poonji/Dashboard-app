import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
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
          id: 'cloudRisk',
          name: 'Cloud Account Risk Assessment',
          type: 'pie',
          data: [
            { name: 'Passed', value: 7253 },
            { name: 'Failed', value: 1689 },
            { name: 'Warning', value: 681 },
            { name: 'Not Available', value: 36 },
          ]
        },
      ],
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'alerts',
          name: 'Top 5 Namespace Specific Alerts',
          type: 'bar',
          data: [
            { name: 'Critical', value: 40 },
            { name: 'High', value: 60 },
            { name: 'Medium', value: 30 }
          ]
        },
        {
          id: 'workload',
          name: 'Workload Alerts',
          type: 'bar',
          data: [
            { name: 'Runtime Alerts', value: 12 },
            { name: 'Image Alerts', value: 8 },
            { name: 'Host Alerts', value: 5 }
          ]
        },
      ],
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          type: 'hbar',
          data: [
            { name: 'Low', value: 100, color: '#FF4444' },  // Red
        { name: 'Medium', value: 150, color: '#FF8042' },    // Orange
        { name: 'High', value: 300, color: '#FFBB28' },  // Yellow
        { name: 'Critical', value: 1011, color: '#00C49F' },     // Green
          ],
        },
        {
          id: 'image-issues',
          name: 'Image Security Issues',
          type: 'hbar',
          data: [
            { name: 'low', value: 100, color: '#FF4444' },  // Red
        { name: 'Medium', value: 150, color: '#FF8042' },    // Orange
        { name: 'High', value: 100, color: '#FFBB28' },  // Yellow
        { name: 'Critical', value: 500, color: '#00C49F' },     // Green
          ],
        },
      ],
    },
  ],
};



const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    addWidget(state, action) {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
  },
});


export const { addWidget, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
