// src/Books.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/book?page=${page}&limit=10`);
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.ISBN} className="card shadow-xl">
            <figure>
              <img src={book.image_url_m} alt={book.book_title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.book_title}</h2>
              <p>Author: {book.book_author}</p>
              <p>Publisher: {book.publisher}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button 
          onClick={handlePrevPage} 
          disabled={page === 1}
          className="btn btn-primary mx-2"
        >
          Previous
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages}
          className="btn btn-primary mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
