'use client';

import { FC } from 'react';

import NavbarLink from '@/components/links/NavbarLink';
import TradeButton from '@/components/TradeButton';

const Navbar: FC = () => {
  return (
    <div className='flex relative justify-center py-6'>
      <NavbarLink href='/'>Home</NavbarLink>
      <NavbarLink href='/leaderboard'>Leaderboard</NavbarLink>
      <NavbarLink href='/stats'>Stats</NavbarLink>
      <NavbarLink href='/make-a-difference'>Make a Difference</NavbarLink>
      <div className='absolute top-0 right-5 py-5 hidden md:block'>
        <TradeButton />
      </div>
    </div>
  );
};

export default Navbar;
