import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import MobileNavbar from '../MobileNavBar';

function Layout({ children }) {
  return (
    <main className="layoutMain">
      <Sidebar />
      <div className="rightSideLayout">
        <Header />
        <MobileNavbar />
        {children}
      </div>
    </main>
  );
}

export default Layout;
