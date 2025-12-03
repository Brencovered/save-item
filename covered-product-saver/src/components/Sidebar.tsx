// src/components/Sidebar.tsx
import React from 'react';
import { Section } from '../types';

interface SidebarProps {
  activeSection: Section;
  onChangeSection: (s: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onChangeSection }) => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Covered</h1>
      <nav className="sidebar-nav">
        <button
          className={activeSection === 'browse' ? 'nav-link active' : 'nav-link'}
          onClick={() => onChangeSection('browse')}
        >
          Browse
        </button>
        <button
          className={activeSection === 'saved' ? 'nav-link active' : 'nav-link'}
          onClick={() => onChangeSection('saved')}
        >
          Saved items
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
