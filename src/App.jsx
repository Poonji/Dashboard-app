import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 🟡 Lift searchTerm state here

  return (
    <div className="min-h-screen bg-[#f5f8fd] text-sm">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* pass as props */}
      <main className="px-4 py-6">
        <Dashboard searchTerm={searchTerm} /> {/* pass to Dashboard only */}
      </main>
    </div>
  );
};

export default App;
