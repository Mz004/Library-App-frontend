import Head from 'next/head';
import config from '@/config/config';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    isbn13: '',
    isbn10: '',
    title: '',
    subtitle: '',
    authors: '',
    categories: '',
    thumbnail: '',
    description: '',
    published_year: '',
    average_rating: '',
    num_pages: '',
    ratings_count: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.isbn13 || !formData.title || !formData.authors || !formData.published_year) {
      return 'ISBN13, Title, Authors, and Published Year are required fields.';
    }
    if (isNaN(formData.average_rating) || isNaN(formData.num_pages) || isNaN(formData.ratings_count)) {
      return 'Average Rating, Number of Pages, and Ratings Count should be numeric values.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${config.baseURL}/api/book/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/books');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to add the book.');
      }
    } catch (error) {
      console.error('Failed to add book:', error);
      setError('An error occurred while adding the book.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add Book</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-100">
        <div className="w-full max-w-4xl p-4">
          <form className="bg-base-200 p-8 rounded shadow-lg" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Add Book</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  value={formData[key]}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ))}
            </div>
            <div className="text-center">
            <button
                type="submit"
                className={`btn btn-primary min-w-fit w-1/3 mt-6 ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Add Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddBookPage;
