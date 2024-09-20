import { useState } from 'react';
import BookCard from './BookCard';
import BookDetails from './BookDetails';

const BooksList = ({ books = [], totalPages, currentPage, onPageChange }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDetailsClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className="m-4">
      {/* Flexbox container for books */}
      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {books.map((book) => (
          <BookCard key={book.isbn13} book={book} onDetailsClick={handleDetailsClick} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="mt-8 flex justify-center">
        <button
          className="btn btn-primary mr-2 w-20"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-primary w-20"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Book details modal */}
      {selectedBook && <BookDetails book={selectedBook} onClose={handleCloseDetails} />}
    </div>
  );
};

export default BooksList;
