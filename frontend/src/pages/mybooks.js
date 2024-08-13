import Head from 'next/head';
import config from '@/config/config';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { booksAtom } from '../context/Atoms';
import Layout from '../components/Layout';
import BooksList from '../components/BooksList';

const FavouritesPage = () => {
  const [books, setBooks] = useAtom(booksAtom);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavourites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchFavourites = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${config.baseURL}/api/user/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch favourite books');
      }
      const data = await res.json();
      setBooks(data);
      setTotalPages(1); // Assuming favourites won't be paginated
    } catch (error) {
      console.error('Error fetching favourites:', error);
      setError('An error occurred while fetching your favourite books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Head>
        <title>My Books</title>
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">My Favourite Books</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-center text-lg">Loading favourite books...</p>
        ) : books && books.length > 0 ? (
          <BooksList
            books={books}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : (
          <p className="text-center text-lg">No favourite books found.</p>
        )}
      </div>
    </Layout>
  );
};

export default FavouritesPage;
