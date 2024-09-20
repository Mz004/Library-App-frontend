import { useAtom } from 'jotai';
import { searchQueryAtom } from '@/context/Atoms';
import { useState } from 'react';

const SearchBar = () => {
  const [, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchType, setSearchType] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null); // For error handling
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before search

    if (searchValue.trim() === '') {
      setError('Please enter a search value.');
      return;
    }

    try {
      setIsSubmitting(true); // Start loading state

      // Simulate search query logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating an API call delay

      setSearchQuery((prev) => ({
        ...prev,
        [searchType]: searchValue,
      }));

      // Clear input after search if needed
      setSearchValue('');
    } catch (err) {
      // Handle any errors that might occur
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false); // End loading state
    }
  };

  return (
    <form className="w-full max-w-80" onSubmit={handleSearch}>
      {/* Search input - full width */}
      <div className="mb-2">
        <input
          type="text"
          name="searchValue"
          placeholder={`Search by ${searchType}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="input input-bordered input-primary w-full"
          disabled={isSubmitting} // Disable input while submitting
        />
      </div>

      {/* Error message display */}
      {error && (
        <p className="text-red-500 mb-2">
          {error}
        </p>
      )}

      <div className="flex flex-row space-x-2 space-y-0">
        {/* Dropdown for search type */}
        <select
          name="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="select select-bordered border-primary select-primary w-3/5"
          disabled={isSubmitting} // Disable dropdown while submitting
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="category">Category</option>
        </select>

        {/* Search button */}
        <button
          type="submit"
          className={`btn btn-primary h-auto w-2/5 ${isSubmitting ? 'loading h-1.5 w-1.5' : ''}`}
          disabled={isSubmitting || searchValue.trim() === ''} // Disable button if empty or submitting
        >
          {isSubmitting ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
