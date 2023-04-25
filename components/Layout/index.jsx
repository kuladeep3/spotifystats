import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

function Layout() {
  return (
    <main className="layoutMain">
      <Sidebar />

      <div className='rightSideLayout'>
        <Header />
      </div>
    </main>
  );
}

export default Layout;
