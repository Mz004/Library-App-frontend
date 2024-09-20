import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/about" className="link link-hover">About</Link>
        <Link href="/contact" className="link link-hover">Contact</Link>
        <Link href="/developer" className="link link-hover">Developer</Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaTwitter size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebookF size={22} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </nav>
      <aside>
        <p>©{new Date().getFullYear()} Epic Reads - All rights reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
