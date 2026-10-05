import React from 'react';
import Dock from './Dock';

/**
 * Navbar component powered by ReactBits macOS Magnifying Dock
 */
const Navbar = ({ activePage, setActivePage, profile }) => {
  return (
    <Dock
      activePage={activePage}
      setActivePage={setActivePage}
      baseItemSize={44}
      magnification={68}
      distance={140}
      position="bottom"
    />
  );
};

export default Navbar;
