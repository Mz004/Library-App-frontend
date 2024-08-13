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

  return (
    <nav className="bg-base-200 p-2 shadow-lg border-b-2">
      <div className="container mx-auto flex justify-between items-center relative">
        <div>
          <Link className={`btn text-2xl font-bold normal-case btn-ghost'}`} href="/homepage">
            Epic Reads
          </Link>
        </div>
        <div className="relative">
          <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={toggleDropdown}>
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048">
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          {dropdownOpen && (
            <ul className="dropdown-content absolute right-0 bg-base-300 rounded-box z-[1] w-40 p-2 shadow-2xl">
              {['dark', 'light', 'luxury', 'lemonade', 'nord', 'retro'].map((themeName) => (
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
              ))}
            </ul>
          )}
        </div>
        <div className="space-x-2 flex items-center">
          {auth.isAuthenticated && (
            <>
              <Link href="/mybooks" className={`btn btn-sm m-1 ${isActive('/mybooks') ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                My Books
              </Link>
              <Link href="/books" className={`btn btn-sm ${isActive('/books') ? 'btn-active' : 'btn-ghost'}`}>
                Books
              </Link>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-sm m-1">
                  {isAdmin ? "Admin" : "Profile"}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                  {isAdmin && (
                    <li>
                      <Link href="/addbook" className={`btn btn-sm ${isActive('/addbook') ? 'btn-active' : 'btn-ghost '}`}>
                        Add Book
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/userhistory" className={`btn btn-sm ${isActive('/userhistory') ? 'btn-active' : 'btn-ghost '}`}>
                      History
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="btn btn-sm btn-ghost w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!auth.isAuthenticated && (
            <Link href="/" className={`btn btn-sm ${isActive('/') ? 'btn-active' : 'btn-ghost'}`}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
