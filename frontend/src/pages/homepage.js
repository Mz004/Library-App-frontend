import Head from 'next/head';
import config from '@/config/config';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { booksAtom, searchQueryAtom } from '@/context/Atoms';
import Layout from '@/components/Layout';
import BooksList from '@/components/BooksList';
import HeroContent from '@/components/HeroContent';

const HomePage = () => {
  const [books, setBooks] = useAtom(booksAtom);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      let url = `${config.baseURL}/api/book?page=${currentPage}&limit=10`;
      if (searchQuery.title || searchQuery.author || searchQuery.category) {
        const params = new URLSearchParams();
        if (searchQuery.title) params.append('title', searchQuery.title);
        if (searchQuery.author) params.append('author', searchQuery.author);
        if (searchQuery.category) params.append('category', searchQuery.category);
        url = `${config.baseURL}/api/book/search?${params.toString()}&page=${currentPage}&limit=10`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await res.json();
      setBooks(data.books || data);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while fetching books. Please try again later.');
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
        <title>Home</title>
      </Head>
      <HeroContent />
      <div className="container mx-auto py-8">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-center">Loading books...</p>
        ) : (
          <BooksList 
            books={books}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;