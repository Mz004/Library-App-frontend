import Link from 'next/link';
import Image from 'next/image';
import config from '@/config/config';
import { jwtDecode } from "jwt-decode";
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { favoritesAtom } from '../context/Atoms';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const BookDetails = ({ book, onClose }) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const isFavorite = favorites.includes(book._id);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === 'admin');
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Failed to authenticate user. Please log in again.');
      }
    }
  }, []);

  const addToFavorites = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/user/favorites/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setFavorites((prevFavorites) => [...prevFavorites, book._id]);
        alert(`${book.title} has been added to your favorites!`);
      } else {
        alert('Failed to add book to favorites.');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('An error occurred while adding the book to your favorites.');
    }
  };

  const removeFromFavorites = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/user/favorites/${book._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setFavorites((prevFavorites) => prevFavorites.filter(id => id !== book._id));
        alert(`${book.title} has been removed from your favorites!`);
        router.reload('/mybooks')
      } else {
        alert('Failed to remove book from favorites.');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('An error occurred while removing the book from your favorites.');
    }
  };

  if (!book) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl relative">
        <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={book.thumbnail || '/images/placeholder.png'}
                alt={book.title}
                fill={true}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><strong>Authors:</strong> {book.authors}</p>
              <p><strong>Categories:</strong> {book.categories}</p>
              <p><strong>Published Year:</strong> {book.published_year}</p>
              <p><strong>Average Rating:</strong> {book.average_rating}</p>
              <p><strong>Number of Pages:</strong> {book.num_pages}</p>
              <p><strong>Ratings Count:</strong> {book.ratings_count}</p>
            </div>

            {/* Conditionally render the Edit button */}
            {isAdmin && (
              <Link href={`/editbook?isbn13=${book.isbn13}`} passHref className="btn btn-secondary mt-6 w-full">
                Edit Book
              </Link>
            )}

            <div className="flex justify-between mt-4">
              {!isFavorite ? (
                <button
                  className="btn btn-primary w-full mr-2 flex items-center justify-center"
                  onClick={addToFavorites}
                >
                  <FaRegHeart className="mr-2" /> Add to Favorites
                </button>
              ) : (
                <button
                  className="btn btn-error w-full ml-2 flex items-center justify-center"
                  onClick={removeFromFavorites}
                >
                  <FaHeart className="mr-2" /> Remove from Favorites
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
