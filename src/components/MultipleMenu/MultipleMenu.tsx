import { Link } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import clsxm from '^/utils/clsxm';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../ui/command';

const MultipleMenu = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="bg-red-100 w-[10rem] h-fit">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem>About Us</CommandItem>
                      <CommandItem>Contact Us</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar className={clsxm('border-2 border-indigo-500')}>
                <AvatarImage src="/user.png" />
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="bg-red-100 w-[10rem] h-fit">
                <Command>
                  <CommandList>
                    <CommandGroup heading="Account">
                      <CommandItem>Profile</CommandItem>
                      <CommandItem>Billing</CommandItem>
                      <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MultipleMenu;
