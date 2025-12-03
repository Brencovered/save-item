// src/components/Header.tsx
import React from 'react';
import { Section } from '../types';

interface HeaderProps {
  activeSection: Section;
  onChangeSection: (s: Section) => void;
  search: string;
  onSearchChange: (v: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  onChangeSection,
  search,
  onSearchChange
}) => {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className={activeSection === 'browse' ? 'tab active' : 'tab'}
          onClick={() => onChangeSection('browse')}
        >
          Browse
        </button>
        <button
          className={activeSection === 'saved' ? 'tab active' : 'tab'}
          onClick={() => onChangeSection('saved')}
        >
          Saved
        </button>
      </div>
      <div className="header-right">
        <input
          className="search-input"
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
