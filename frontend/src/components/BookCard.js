import Image from 'next/image';
import config from '@/config/config';
import { useAtom } from 'jotai';
import { favoritesAtom } from '@/context/Atoms';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const BookCard = ({ book, onDetailsClick }) => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const isFavorite = favorites.includes(book._id);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites();
      } else {
        await addToFavorites();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('An error occurred while updating your favorites. Please try again.');
    }
  };

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
      } else {
        alert('Failed to remove book from favorites.');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('An error occurred while removing the book from your favorites.');
    }
  };

  return (
    <div className="card bg-base-200 shadow-lg p-4 mb-4 flex flex-col items-center w-48">
      <div className="w-full flex flex-col items-center relative">
        <div className="relative w-32 h-44 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={book.thumbnail || '/images/placeholder.png'}
            alt={book.title}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 text-red-500 text-xl"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <h2 className="card-title mt-4 text-center text-lg font-semibold truncate w-full">
          {book.title}
        </h2>
        <p className="text-sm text-gray-600 truncate w-full">by {book.authors}</p>
      </div>
      <div className="mt-4 flex space-x-2 w-full">
        <button
          className="btn btn-primary btn-outline w-full"
          onClick={() => onDetailsClick(book)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
