import React from 'react';

interface SidebarProps {
  activeSection: 'browse' | 'saved';
  onChangeSection: (section: 'browse' | 'saved') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onChangeSection }) => {
  return (
    <aside className="sidebar">
      <h1>Covered Demo</h1>

      <div className="sidebar-section-title">Shop</div>
      <button
        className={
          'sidebar-nav-button ' + (activeSection === 'browse' ? 'active' : '')
        }
        onClick={() => onChangeSection('browse')}
      >
        Browse
      </button>

      <div className="sidebar-section-title">Compare</div>
      <button
        className={
          'sidebar-nav-button ' + (activeSection === 'saved' ? 'active' : '')
        }
        onClick={() => onChangeSection('saved')}
      >
        Saved items
      </button>
    </aside>
  );
};

export default Sidebar;
