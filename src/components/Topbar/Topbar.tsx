import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu';
import Image from 'next/image';

import LocaleSwitcher from '../LocalSwitcher';
import { useEffect, useState } from 'react';
import SingleMenu from '../SingleMenu/SingleMenu';
import MultipleMenu from '../MultipleMenu/MultipleMenu';

const Topbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  return (
    <>
      <div className="flex justify-between items-center w-full bg-primary rounded-[1rem] mt-[1rem] px-[0.9rem]">
        <div className="flex items-center justify-start w-1/4 h-8">
          <Image src={'/sporter-logo.png'} width={33} height={33} alt="logo" />
        </div>
        <div className="flex items-center justify-center w-1/2 h-8 ">
          <MultipleMenu />
        </div>
        <div className="flex justify-end w-1/4 h-8 ">
          <LocaleSwitcher />
        </div>
      </div>
    </>
  );
};
export default Topbar;
