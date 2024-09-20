import Image from 'next/image';

const BookCard = ({ book, onDetailsClick }) => {
  return (
    <div className="card bg-base-200 backdrop:blur-lg bg-opacity-100 shadow-lg rounded-lg p-4 mb-6 flex flex-col items-center w-52 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Book Image */}
      <div className="w-full flex flex-col items-center relative">
        <div className="relative w-40 h-52 bg-transparent rounded-lg overflow-hidden shadow-md">
          <Image
            src={book.thumbnail || '/images/placeholder.png'}
            alt={book.title}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
        </div>

        {/* Book Title */}
        <h2 className="mt-4 text-center text-lg font-bold text-primary truncate w-full">
          {book.title}
        </h2>

        {/* Book Authors */}
        <p className="text-sm text-center truncate w-full">by {book.authors}</p>
      </div>

      {/* Button to View Details */}
      <div className="mt-4 w-full">
        <button
          className="btn btn-primary w-full py-2 px-4 font-medium rounded-md transition-colors  focus:outline-none focus:ring"
          onClick={() => onDetailsClick(book)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
