import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ];

  const footerNavLinks = [
    { name: 'About Us', href: '#', isRouterLink: false },
    { name: 'Contact', href: '/support', isRouterLink: true },
    { name: 'Privacy Policy', href: '#', isRouterLink: false },
    { name: 'Terms of Service', href: '#', isRouterLink: false },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              MacClone {/* Placeholder Brand Name */}
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-6 md:mb-0">
            {footerNavLinks.map((link) =>
              link.isRouterLink ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MacClone Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;