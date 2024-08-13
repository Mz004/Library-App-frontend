import Layout from '@/components/Layout';
import config from '@/config/config';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/user/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
        setError('Failed to load user history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-base-content">Loading history...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <Layout>
      <Head>
      <title>User History</title>
    </Head>
    <div className="container mx-auto py-8 px-56">
      <h1 className="text-3xl font-bold mb-6 text-primary">User History</h1>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="p-4 bg-base-200 rounded shadow">
              <Link href={entry.route} className="text-blue-500 hover:underline">{entry.route}</Link>{' '}
              <span className="text-base-content">- Visited at: {new Date(entry.visitedAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-base-content">No history found.</p>
      )}
    </div>
    </Layout>
  );
};

export default UserHistory;
