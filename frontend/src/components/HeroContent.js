import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const HeroContent = () => {
  return (
    <div className="hero h-auto bg-gradient-to-r from-base-300 to-transparent rounded-lg shadow-lg flex items-center justify-center">
      <div className="hero-content text-neutral-content text-center flex flex-col lg:flex-row lg:justify-between lg:items-center lg:text-left w-full max-w-screen-lg px-4">
        <div className="max-w-md mb-5 lg:mb-0 lg:mr-10">
          <h1 className="mb-4 text-3xl lg:text-4xl font-bold text-base-content">Welcome to the Library</h1>
          <p className="mb-4 text-base lg:text-lg text-base-content">Find your favorite books here!</p>
          <Link href="/books" className="btn btn-primary">
            Discover Books
          </Link>
        </div>
        <div className="form-control w-full max-w-sm mx-auto lg:mx-0">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HeroContent;