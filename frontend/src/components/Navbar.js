import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthProvider';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const router = useRouter();
  const { auth, logout } = useAuth();
  const [theme, setTheme] = useState('luxury');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const isActive = (path) => router.pathname === path;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'luxury';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === 'admin');
      } catch {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <nav className="bg-base-200 px-4 py-4 shadow-lg border-b-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link className="text-3xl font-bold normal-case" href="/homepage">
            Epic Reads
          </Link>
        </div>

        {/* Theme dropdown (visible for larger screens) */}
        <div className="hidden sm:inline-block relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost"
            onClick={toggleDropdown}
          >
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          {dropdownOpen && (
            <ul className="dropdown-content absolute right-0 bg-base-300 rounded-box z-[50] w-40 p-2 shadow-2xl">
              {['dark', 'light', 'luxury', 'lemonade', 'nord', 'retro'].map(
                (themeName) => (
                  <li key={themeName}>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className="theme-controller btn btn-xs btn-block btn-ghost justify-start"
                      aria-label={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                      value={themeName}
                      checked={theme === themeName}
                      onChange={() => handleThemeChange(themeName)}
                    />
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* Nav links for larger screens */}
        <div className="hidden md:flex space-x-2 items-center">
          {auth.isAuthenticated && (
            <>
              <Link
                href="/mybooks"
                className={`btn btn-sm m-1 ${
                  isActive('/mybooks') ? 'btn-primary' : 'btn-outline btn-primary'
                }`}
              >
                My Books
              </Link>
              <Link
                href="/books"
                className={`btn btn-sm ${
                  isActive('/books') ? 'btn-active' : 'btn-ghost'
                }`}
              >
                Books
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-ghost m-1"
                >
                  {isAdmin ? 'Admin' : 'Profile'}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                >
                  {isAdmin && (
                    <li>
                      <Link
                        href="/addbook"
                        className={`btn btn-sm ${
                          isActive('/addbook') ? 'btn-active' : 'btn-ghost'
                        }`}
                      >
                        Add Book
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href="/userhistory"
                      className={`btn btn-sm ${
                        isActive('/userhistory') ? 'btn-active' : 'btn-ghost'
                      }`}
                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="btn btn-sm btn-ghost w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!auth.isAuthenticated && (
            <Link
              href="/"
              className={`btn btn-sm ${isActive('/') ? 'btn-active' : 'btn-ghost'}`}
            >
              Login
            </Link>
          )}
        </div>

        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden fill-current"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {openMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {openMenu && (
          <div className="absolute top-14 left-0 w-full md:hidden z-40 backdrop-blur-sm">
            <div className="flex flex-col space-y-2 items-start p-4 bg-base-300 rounded-lg shadow-lg">
              {auth.isAuthenticated && (
                <>
                  <div className="fixed top-2 right-4 font-semibold text-primary">
                    {isAdmin ? 'Admin' : 'User Profile'}
                  </div>
                  {isAdmin && (
                      <Link
                        href="/addbook"
                        className={`fixed top-8 right-4 btn btn-sm fill-inherit ${
                          isActive('/addbook') ? 'btn-primary' : 'btn-outline btn-primary'
                        }`}
                      >
                        Add Book
                      </Link>
                  )}
                  <Link
                    href="/mybooks"
                    className={`btn btn-sm ${
                      isActive('/mybooks') ? 'btn-primary' : 'btn-outline btn-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    My Books
                  </Link>
                  <Link
                    href="/books"
                    className={`btn btn-sm fill-inherit ${
                      isActive('/books') ? 'btn-active' : 'btn-ghost'
                    }`}
                    onClick={closeMenu}
                  >
                    Books
                  </Link>
                  <Link
                    href="/userhistory"
                    className={`btn btn-sm fill-inherit ${
                      isActive('/userhistory') ? 'btn-active' : 'btn-ghost'
                    }`}
                  >
                    History
                  </Link>    
                </>
              )}
              {!auth.isAuthenticated && (
                <Link
                  href="/"
                  className={`btn btn-sm ${
                    isActive('/') ? 'btn-active' : 'btn-ghost'
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}

             {/* Theme dropdown (visible for smaller screens) */}
              <div className="sm:hidden  relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-ghost"
                  onClick={toggleDropdown}
                >
                  Theme
                  <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                  >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                  </svg>
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-content absolute left-0 bg-base-300 rounded-box z-[50] w-40 p-2 shadow-2xl">
                    {['dark', 'light', 'luxury', 'lemonade', 'nord', 'retro'].map(
                      (themeName) => (
                        <li key={themeName}>
                          <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-xs btn-block btn-ghost justify-start"
                            aria-label={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                            value={themeName}
                            checked={theme === themeName}
                            onChange={() => handleThemeChange(themeName)}
                          />
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
              {auth.isAuthenticated && (
              <button
                onClick={logout}
                className="btn btn-sm btn-ghost w-full text-left"
              >
                Logout
              </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
