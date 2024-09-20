import Head from 'next/head';
import config from '@/config/config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const EditBookPage = () => {
  const router = useRouter();
  const { isbn13 } = router.query;
  const [formData, setFormData] = useState({
    isbn13: '',
    title: '',
    authors: '',
    categories: '',
    thumbnail: '',
    description: '',
    published_year: '',
    average_rating: '',
    num_pages: '',
    ratings_count: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isbn13) {
      fetchBookDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isbn13]);

  const fetchBookDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${config.baseURL}/api/book/${isbn13}`);
      if (!res.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await res.json();
      setFormData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${config.baseURL}/api/book/${isbn13}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to update book');
      }
      alert('Book updated successfully');
      router.push('/books');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    setError('');
    try {
      const res = await fetch(`${config.baseURL}/api/book/${isbn13}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete book');
      }
      alert('Book deleted successfully');
      router.push('/books');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Head>
        <title>Edit Book</title>
      </Head>
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Edit Book</h1>
          <p>Loading book details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Edit Books</title>
      </Head>
      <div className="container mx-auto py-8 px-4 sm:px-12 md:px-24 xl:px-40">
        <h1 className="text-4xl font-bold mb-4 text-primary">Edit Book</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="isbn13"
              placeholder="ISBN13"
              className="input input-bordered w-full"
              value={formData.isbn13}
              onChange={handleChange}
              required
              disabled
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="authors"
              placeholder="Authors"
              className="input input-bordered w-full"
              value={formData.authors}
              onChange={handleChange}
            />
            <input
              type="text"
              name="categories"
              placeholder="Categories"
              className="input input-bordered w-full"
              value={formData.categories}
              onChange={handleChange}
            />
            <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full my-2 md:col-span-2"
            value={formData.description}
            onChange={handleChange}
            ></textarea>
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail URL"
              className="input input-bordered w-full"
              value={formData.thumbnail}
              onChange={handleChange}
            />
            <input
              type="number"
              name="published_year"
              placeholder="Published Year"
              className="input input-bordered w-full"
              value={formData.published_year}
              onChange={handleChange}
            />
            <input
              type="number"
              name="average_rating"
              placeholder="Average Rating"
              className="input input-bordered w-full"
              value={formData.average_rating}
              onChange={handleChange}
            />
            <input
              type="number"
              name="num_pages"
              placeholder="Number of Pages"
              className="input input-bordered w-full"
              value={formData.num_pages}
              onChange={handleChange}
            />
            <input
              type="number"
              name="ratings_count"
              placeholder="Ratings Count"
              className="input input-bordered w-full"
              value={formData.ratings_count}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row space-x-2 mt-6">
            <button type="submit" className="btn btn-primary">
              Update Book
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}>Delete Book</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditBookPage;
