import React from 'react';

interface HeaderProps {
  activeSection: 'browse' | 'saved';
  onChangeSection: (section: 'browse' | 'saved') => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  onChangeSection,
  search,
  onSearchChange
}) => {
  return (
    <header className="top-nav">
      <div className="top-nav-tabs">
        <button
          className={
            'tab-button ' + (activeSection === 'browse' ? 'active' : '')
          }
          onClick={() => onChangeSection('browse')}
        >
          Browse
        </button>
        <button
          className={
            'tab-button ' + (activeSection === 'saved' ? 'active' : '')
          }
          onClick={() => onChangeSection('saved')}
        >
          Compare / Saved
        </button>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search products…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </header>
  );
};

export default Header;
