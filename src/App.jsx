import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); 

  return (
    <div className="min-h-screen bg-[#f5f8fd] text-sm">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="px-4 py-6">
        <Dashboard searchTerm={searchTerm} /> 
      </main>
    </div>
  );
};

export default App;
