import React from 'react';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <aside className="sidebarLayout">
      <ul className="sideBarListContainer">
        <SidebarItem link="/dashboard/graphs">Graphs</SidebarItem>
        <SidebarItem link="/dashboard/top-tracks">Top tracks</SidebarItem>
      </ul>
    </aside>
  );
}

export default Sidebar;
