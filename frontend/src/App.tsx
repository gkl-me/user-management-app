import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

const App: React.FC = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-blue-500 shadow-md',
        }}
      />
      <Outlet />
    </>
  );
};

export default App;
