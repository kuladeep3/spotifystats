import React from 'react';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <aside className="sidebarLayout">
      <ul className="sideBarListContainer">
        <SidebarItem link="/dashboard/top-artists">Top Artists</SidebarItem>
        <SidebarItem link="/dashboard/top-tracks">Top Tracks</SidebarItem>
      </ul>
    </aside>
  );
}

export default Sidebar;
