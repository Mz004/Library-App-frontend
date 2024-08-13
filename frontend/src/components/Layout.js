import { useRouter } from 'next/router';
import { useEffect } from 'react';
import config from '@/config/config';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = async (url) => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${config.baseURL}/api/user/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ route: url }),
        });

        if (!response.ok) {
          console.error('Failed to store route', await response.json());
        }
      } catch (error) {
        console.error('Error storing route:', error);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
