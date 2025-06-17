import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Laptop, User, ShoppingCart, Menu } from 'lucide-react';

const navLinks = [
  { href: "/product-overview", label: "Product" },
  { href: "/specifications", label: "Specs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/support", label: "Support" },
];

const Header: React.FC = () => {
  console.log('Header loaded');

  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive
      ? "text-sm font-semibold text-primary transition-colors hover:text-primary/90"
      : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary/90";
  };

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive
      ? "block py-2 px-3 text-base font-semibold text-primary bg-muted rounded-md"
      : "block py-2 px-3 text-base font-medium text-foreground hover:bg-muted rounded-md";
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2" aria-label="MacClone Homepage">
            <Laptop className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg sm:inline-block">MacClone</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={getNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right side actions & Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" aria-label="User Account" className="hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    <Link to="/" className="flex items-center space-x-2">
                      <Laptop className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl">MacClone</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <NavLink
                        to={link.href}
                        className={getMobileNavLinkClass}
                      >
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                   <SheetClose asChild>
                     <NavLink to="/cart" className={getMobileNavLinkClass}>
                        Shopping Cart
                     </NavLink>
                   </SheetClose>
                   {/* Placeholder for account link in mobile if it were available */}
                   {/* <SheetClose asChild>
                     <NavLink to="/account" className={getMobileNavLinkClass}>
                        My Account
                     </NavLink>
                   </SheetClose> */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;